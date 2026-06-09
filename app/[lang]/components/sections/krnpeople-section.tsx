'use client'
import React, { useEffect, useState } from 'react'
import './board-people-section.css'
import { getKrnPeopleByType, getPeopleDepartmentTypes } from '../../api/lib/about'
import { Loader } from '../states/loader'
import { PeopleCard } from '../core/cards/people-card'
import { EmptyState } from '../states/emptyState'
import { useSearchParams } from 'next/navigation'

// Component For People Page & Board Of Visionaries Page
export const KrnPeopleSection = () => {
  const searchParams = useSearchParams()
  const department = searchParams.get('department')
  const [active, setActive] = useState(1)
  const [selectedType, setSelectedType] = useState(department ?? '')
  const [loading, setLoading] = useState<boolean>(false)
  const [board, setBoard] = useState([])
  const [types, setTypes] = useState([])

  // Get data for people acc to department selected
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getKrnPeopleByType(selectedType)
        setBoard(res || [])
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [selectedType])

  // Get departments for  people
  useEffect(() => {
    async function fetchData() {
      try {
        const deptTypes = await getPeopleDepartmentTypes()
        // Find the index
        const findActive = deptTypes.findIndex((deptType: any) => deptType.name === department)
        setActive(findActive + 2)
        setTypes(deptTypes)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            {types.length != 0 ? (
              <ul className='nav d-md-flex align-items-center justify-content-center bg-white innerTab'>
                <li>
                  <button
                    className={`${1 == active ? 'active-link' : ''}`}
                    id={`section${1}`}
                    type='button'
                    role='tab'
                    onClick={(event: any) => {
                      setActive(1)
                      setSelectedType('')
                    }}
                    value='All'
                  >
                    All
                  </button>
                </li>

                {types?.map((type: any, index: any) => {
                  return (
                    <li>
                      <button
                        className={`${index + 2 == active ? 'active-link' : ''}`}
                        id={`section${index + 2}`}
                        type='button'
                        role='tab'
                        value={type?.name}
                        onClick={(event: any) => {
                          setActive(index + 2)
                          setSelectedType(event.target.value)
                        }}
                      >
                        {type?.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <Loader center={true} />
            )}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <section className='mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {board.length != 0 ? <h2 className='mb-2 mb-md-4'>{selectedType ? selectedType : ''}</h2> : null}
            </div>
            {board.length != 0 ? (
              board?.map((person: any) => {
                if (person.ourLeader.partOfPeople) {
                  return (
                    <div className='col-md-3'>
                      <PeopleCard
                        imgUrl={person?.featuredImage?.node?.sourceUrl}
                        caption={person?.featuredImage?.node?.caption}
                        theme={person?.ourLeader?.profileimagetheme}
                        title={person?.title}
                        position={person?.ourLeader?.memberPosition}
                        desc={person?.content}
                        section='people'
                      />
                    </div>
                  )
                }
              })
            ) : (
              <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
