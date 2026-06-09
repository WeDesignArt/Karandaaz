'use client'
import './page.css'
import { SearchCard } from '../components/core/cards/search-card'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { Pagination } from 'antd'
import {
  getBlogsBySearch,
  getNewslettersBySearch,
  getPressBySearch,
  getPublicationsBySearch,
  getStoriesBySearch,
} from '../api/lib/search'
import { Loader } from '../components/states/loader'
// import { convertToPostType, convertToUrl } from '../../utils/string'
import { EmptyState } from '../components/states/emptyState'
import { convertToPostType, convertToUrl } from '../../../utils/string'
import { itemRender } from '../../../utils/pagination'
// import { itemRender } from '../../utils/pagination'

export default function SearchPage() {
  const [total, setTotal] = useState(0)
  // by default value is nullnull to get empty data
  const [searchText, setSearchText] = useState('nullnull')
  const [displaySearchText, setDisplaySearchText] = useState('') // for top display field
  const [buttonTimestamp, setButtonTimestamp] = useState<string>()
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [active, setActive] = useState(1)
  const [navItems, setNavItems] = useState([
    'Show All',
    'Blogs',
    'Publications',
    'News & Press Releases',
    'Karandaaz Stories',
    'Newsletters',
  ])
  const [selectedNavItem, setSelectedNavItem] = useState('Show All')
  const [loading, setLoading] = useState<boolean>(false)
  const [searchRes, setSearchRes] = useState([])

  // If the search text is empty,
  // Default value is set to nullnull to get no data
  const setSearchTextField = (e: any) => {
    if (e.target.value == '') {
      setSearchText('nullnull')
    } else {
      setSearchText(e.target.value)
    }
  }
  // To not show 'nullnull' in display field
  const setButtonClick = () => {
    setButtonTimestamp(moment().format('DD-MM-YYYYThh:mm:ssZ'))
    if (searchText == 'nullnull') {
      setDisplaySearchText('')
    } else {
      setDisplaySearchText(searchText)
    }
  }
  // Updates offset by page number provided
  const updateOffset = (page: number) => {
    setOffset(0 + (page - 1) * pageSize)
  }
  // Page Change
  const onPageChange = (page: number, pageSize: number) => {
    updateOffset(page)
    setPage(page)
  }

  useEffect(() => {
    let res: any
    async function fetchData() {
      try {
        setLoading(true)
        // gets all data using custom wp endpoint
        if (selectedNavItem == 'Show All') {
          fetch(
            `https://krndevelop.wpenginepowered.com/wp-json/custom/v1/search?keyword=${searchText}&offset=${offset}&limit=${pageSize}`
          )
            .then((res) => res.json())
            .then((data) => {
              setSearchRes(data ? data?.posts : [])
              setLoading(false)
              setTotal(100)
            })
        }
        // gets data acc to selected nav item - using graphql
        else {
          if (selectedNavItem == 'Blogs') {
            res = await getBlogsBySearch(offset, pageSize, searchText)
          } else if (selectedNavItem == 'Publications') {
            res = await getPublicationsBySearch(offset, pageSize, searchText)
          } else if (selectedNavItem == 'News & Press Releases') {
            res = await getPressBySearch(offset, pageSize, searchText)
          } else if (selectedNavItem == 'Karandaaz Stories') {
            res = await getStoriesBySearch(offset, pageSize, searchText)
          } else if (selectedNavItem == 'Newsletters') {
            res = await getNewslettersBySearch(offset, pageSize, searchText)
          }
          setSearchRes(res ? res?.nodes : [])
          setTotal(res?.pageInfo?.offsetPagination?.total)
        }
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [selectedNavItem, offset, buttonTimestamp])

  // Resets pagination in case of navigation
  useEffect(() => {
    setOffset(0)
    setPage(1)
  }, [buttonTimestamp, selectedNavItem])
  return (
    <main>
      <section className='section-py-md pb-0'>
        <div className='container'>
          <div className='row'>
            <form className='search_form d-md-flex mb-3 pb-2 pb-md-4' onSubmit={(e: any) => e.preventDefault()}>
              <input
                type='search'
                name='search_post'
                placeholder='What would you like to know?'
                onChange={setSearchTextField}
                className='form-control rounded-pill w-100 body2 me-2 flex-1 '
              ></input>
              <input className='mt-4 mt-md-0' type='submit' onClick={setButtonClick} value={'Search'} />
            </form>
            <h4 className='my-5'>
              Search Result for{' '}
              <span className='tx-krnblue'> {displaySearchText ? ` "${displaySearchText}"` : ''} </span>
            </h4>
          </div>
        </div>
      </section>

      <section className='section-py-md pt-0'>
        <div className='container'>
          <div className='row'>
            {/* Nav Section */}
            <nav className='d-none d-md-block search-tabs'>
              <ul className='d-flex justify-content-start bg-white p-0 m-0'>
                {navItems.map((item: any, index: number) => {
                  return (
                    <Link
                      className={`cursor-pointer subtitle-style-1 tx-krngrey ${
                        index + 1 == active ? 'active-link' : ''
                      }`}
                      href={''}
                      onClick={(event: any) => {
                        setActive(index + 1)
                        setSelectedNavItem(item)
                        // setSearchText('nullnull')
                        // setDisplaySearchText('')
                        // setSearchRes([])
                      }}
                    >
                      {item}
                    </Link>
                  )
                })}
              </ul>
            </nav>

            {/* Search Results Cards  */}
            {searchRes.length != 0 ? (
              searchRes?.map((arr: any) => {
                let postName = arr?.post_name ? arr?.post_name : selectedNavItem
                let slug = arr?.slug ? arr?.slug : arr?.post_slug
                return (
                  <SearchCard
                    title={arr?.title}
                    desc={arr?.excerpt}
                    postType={arr?.post_type ? arr?.post_type : convertToPostType(selectedNavItem, navItems)}
                    postName={postName}
                    link={
                      arr?.insightNewsletter?.uploadThePublication?.node?.mediaItemUrl
                        ? arr?.insightNewsletter?.uploadThePublication?.node?.mediaItemUrl
                        : convertToUrl(postName, navItems, slug)
                    }
                  />
                )
              })
            ) : (
              <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
            )}
          </div>
        </div>
      </section>
      {/* Pagination */}
      <Pagination
        align='center'
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        current={page}
        itemRender={itemRender}
      />
    </main>
  )
}
