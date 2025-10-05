import { Select } from '@losensky-systems/web-components-core'

export function DebugSelect() {
  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
      <h3>Debug Select Component</h3>
      <p>This should have a styled dropdown:</p>
      
      <Select placeholder="Debug Select">
        <Select.Item value="test1">Test Option 1</Select.Item>
        <Select.Item value="test2">Test Option 2</Select.Item>
      </Select>
      
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Check browser dev tools to see if CSS classes are applied:
        <br />- .web-select (container)
        <br />- .web-select-trigger (button)
        <br />- .web-select-dropdown (dropdown)
      </p>
    </div>
  )
}
