'use client'
import { PeopleCard } from '../../../components/core/cards/people-card'
import { Breadcrumb } from '../../../components/navigation/breadcrumb'
import { authorsInfoUrl } from '../../../../../utils/urls'
import React, { useEffect, useState } from 'react'

export default function Authors() {
  const [loading, setLoading] = useState(true)
  const [authorsRes, setAuthorsRes] = useState([])

  // Get all authors
  useEffect(() => {
    let res: any
    async function fetchData() {
      try {
        setLoading(true)
        fetch(`https://krndevelop.wpenginepowered.com/wp-json/custom/v1/users-by-role/?role=author`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setAuthorsRes(data ? data : [])
            setLoading(false)
          })
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <section className='section-py-md subheader'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 text-center mx-auto'>
              <Breadcrumb />
              <h2 className='pb-2 pb-md-5'>Authors</h2>
            </div>
          </div>
        </div>
      <div className='container'>
        <div className='row'>
          {authorsRes?.map((author: any) => {
            return (
              <div className='col-md-3'>
                <PeopleCard
                  imgUrl={author?.profile_picture}
                  caption={''}
                  title={author?.name}
                  position={author?.user_designation}
                  linkUrl={authorsInfoUrl + author?.id}
                  desc=''
                  section='authors'
                  theme={''}
                />
              </div>
            )
          })}
        </div>
      </div>
      </section>
    </>
  )
}
