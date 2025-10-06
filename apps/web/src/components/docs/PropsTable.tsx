import React from 'react'

interface Prop {
  name: string
  type: string
  default?: string
  description: string
}

interface PropsTableProps {
  props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Prop
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Type
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Default
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={prop.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-200 px-4 py-3 text-sm font-mono text-blue-600">
                {prop.name}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm font-mono text-gray-700">
                {prop.type}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm font-mono text-gray-500">
                {prop.default || '-'}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
