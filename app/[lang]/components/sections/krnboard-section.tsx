'use client'
import React, { useEffect, useState } from 'react'
import './board-people-section.css'
import { getBoardVisionariesByType, getBoardVisionaryTypes } from '../../api/lib/about'
import { Loader } from '../states/loader'
import { VisionaryCard } from '../core/cards/visionary-card'
import { EmptyState } from '../states/emptyState'

// Component For People Page & Board Of Visionaries Page
export const KrnBoardSection = () => {
  const defaultType = 'Board of Directors'
  const [active, setActive] = useState(defaultType)
  const [selectedType, setSelectedType] = useState(defaultType)
  const [loading, setLoading] = useState<boolean>(false)
  const [board, setBoard] = useState([])
  const [types, setTypes] = useState([])

  // Get data for board members according to department type
  useEffect(() => {
    async function fetchBoardMembersByType() {
      try {
        if (selectedType === '') return // Skip this effect if no specific type is selected
        setLoading(true)
        const res = await getBoardVisionariesByType(selectedType)

        const sortedBoard = res?.sort((a: any, b: any) => {
          const aTargetIndex = a?.typebovs?.nodes.findIndex((node: any) => node.name === selectedType)
          const bTargetIndex = b?.typebovs?.nodes.findIndex((node: any) => node.name === selectedType)

          const aIsChairAndPrimary =
            a?.ourLeader?.departmentPosition === 'Chair' && a?.typebovs?.edges?.[aTargetIndex]?.isPrimary

          const bIsChairAndPrimary =
            b?.ourLeader?.departmentPosition === 'Chair' && b?.typebovs?.edges?.[bTargetIndex]?.isPrimary

          if (aIsChairAndPrimary && !bIsChairAndPrimary) return -1 // "Chair" + "isPrimary" comes first
          if (!aIsChairAndPrimary && bIsChairAndPrimary) return 1

          return 0 // Maintain original order for others
        })
        setBoard(sortedBoard || [])
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchBoardMembersByType()
  }, [selectedType]) // Run when the selectedType changes

  // Get department types for the board
  useEffect(() => {
    async function fetchData() {
      try {
        const deptTypes = await getBoardVisionaryTypes()
        setTypes(deptTypes || [])

        const initialType = deptTypes?.find((type: any) => type?.name === defaultType)?.name || deptTypes?.[0]?.name || ''
        setActive(initialType)
        setSelectedType(initialType)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          {types.length != 0 ? (
            <ul className='nav d-flex align-items-center justify-content-center bg-white innerTab'>
              {types?.map((type: any, index: any) => {
                return (
                  <li key={index}>
                    <button
                      className={`${type?.name == active ? 'active-link' : ''}`}
                      id={`section${index + 1}`}
                      type='button'
                      role='tab'
                      value={type?.name}
                      onClick={(event: any) => {
                        setActive(event.target.value)
                        setSelectedType(event.target.value) // Fetch members based on type
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
      <section className='mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='mb-2 mb-md-4'>{selectedType ? selectedType : ''}</h2>
          </div>
          {board.length != 0 ? (
            board?.map((person: any, index: number) => {
              const targetindex = person?.typebovs?.nodes.findIndex((node: any) => node.name === selectedType)
              return (
                <div className='col-md-6' key={index}>
                  <VisionaryCard
                    imgUrl={person?.featuredImage?.node?.sourceUrl}
                    caption={person?.featuredImage?.node?.caption}
                    theme={person?.ourLeader?.profileimagetheme}
                    title={person?.title}
                    content={person?.content}
                    position={person?.ourLeader?.memberPosition}
                    deptPosition={person?.ourLeader?.departmentPosition}
                    type={selectedType}
                    isPrimary={person.typebovs?.edges?.[targetindex]?.isPrimary}
                  />
                </div>
              )
            })
          ) : (
            <div className='text-center'> {loading ? <Loader /> : <EmptyState />}</div>
          )}
        </div>
      </section>
    </>
  )
}
