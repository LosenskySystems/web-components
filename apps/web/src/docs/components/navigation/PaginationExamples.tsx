import { Pagination } from '@losensky-systems/web-components-core'
import { useState } from 'react'

export function PaginationBasicExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  )
}

export function PaginationWithInfoExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showInfo
      showFirstLast
    />
  )
}

export function PaginationComplexExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 20

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showInfo
      showFirstLast
    />
  )
}

export function PaginationWithoutNumbersExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showPageNumbers={false}
      showFirstLast
    />
  )
}

export function PaginationSizeExample() {
  const [currentPage, setCurrentPage] = useState(3)
  const totalPages = 10

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="sm"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="md"
        />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          size="lg"
        />
      </div>
    </>
  )
}

