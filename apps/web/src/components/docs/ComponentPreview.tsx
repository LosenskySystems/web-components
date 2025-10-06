import React from 'react'
import { 
  Button, 
  Divider, 
  Label, 
  Loader, 
  Tooltip, 
  Badge, 
  Avatar, 
  Icon, 
  Dropdown, 
  DropdownItem, 
  DropdownDivider, 
  DropdownMenu,
  Alert,
  Card,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPanel,
  Accordion,
  AccordionItem,
  Toast
} from '@losensky-systems/web-components-core'

interface ComponentPreviewProps {
  componentName: string
  className?: string
}

export function ComponentPreview({ componentName, className = '' }: ComponentPreviewProps) {
  const renderPreview = () => {
    switch (componentName.toLowerCase()) {
      case 'button':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="primary">Button</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
          </div>
        )
      
      case 'divider':
        return <Divider />
      
      case 'label':
        return (
          <div className="space-y-2">
            <Label>Label Text</Label>
            <Label variant="secondary">Secondary Label</Label>
          </div>
        )
      
      case 'loader':
        return (
          <div className="flex justify-center">
            <Loader size="sm" />
          </div>
        )
      
      case 'tooltip':
        return (
          <div className="flex justify-center">
            <Tooltip content="This is a tooltip">
              <Button size="sm">Hover me</Button>
            </Tooltip>
          </div>
        )
      
      case 'badge':
        return (
          <div className="flex gap-2">
            <Badge variant="primary">New</Badge>
            <Badge variant="secondary">5</Badge>
          </div>
        )
      
      case 'avatar':
        return (
          <div className="flex gap-2">
            <Avatar size="sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <Avatar size="sm" fallback="JD" />
          </div>
        )
      
      case 'icon':
        return (
          <div className="flex gap-2 text-gray-600">
            <Icon name="heart" size="sm" />
            <Icon name="star" size="sm" />
            <Icon name="user" size="sm" />
          </div>
        )
      
      case 'dropdown':
        return (
          <Dropdown>
            <DropdownMenu>
              <DropdownItem>Action 1</DropdownItem>
              <DropdownItem>Action 2</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Action 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      
      case 'alert':
        return (
          <Alert variant="info" size="sm">
            This is an alert message
          </Alert>
        )
      
      case 'card':
        return (
          <Card size="sm">
            <Card.Header>
              <h4 className="text-sm font-medium">Card Title</h4>
            </Card.Header>
            <Card.Body>
              <p className="text-xs text-gray-600">Card content</p>
            </Card.Body>
          </Card>
        )
      
      case 'input':
        return (
          <div className="space-y-2">
            <Input size="sm" placeholder="Enter text..." />
            <Input size="sm" variant="error" placeholder="Error state" />
          </div>
        )
      
      case 'select':
        return (
          <Select size="sm" placeholder="Choose option...">
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select>
        )
      
      case 'textarea':
        return (
          <Textarea size="sm" placeholder="Enter message..." rows={2} />
        )
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            <Checkbox>Checkbox option</Checkbox>
            <Checkbox checked>Checked option</Checkbox>
          </div>
        )
      
      case 'radio':
        return (
          <div className="space-y-2">
            <Radio name="preview" value="option1">Option 1</Radio>
            <Radio name="preview" value="option2" checked>Option 2</Radio>
          </div>
        )
      
      case 'tabs':
        return (
          <Tabs defaultValue="tab1" size="sm">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="text-xs">Tab 1 content</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="text-xs">Tab 2 content</p>
            </TabsContent>
          </Tabs>
        )
      
      case 'accordion':
        return (
          <Accordion size="sm">
            <AccordionItem value="item-1" title="Item 1">
              <p className="text-xs">Accordion content</p>
            </AccordionItem>
          </Accordion>
        )
      
      case 'toast':
        return (
          <div className="flex justify-center">
            <Toast variant="success" size="sm">
              Success message
            </Toast>
          </div>
        )
      
      default:
        return (
          <div className="text-xs text-gray-400 text-center py-2">
            Preview not available
          </div>
        )
    }
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-3 border border-gray-200 ${className}`}>
      <div className="flex items-center justify-center min-h-[60px]">
        {renderPreview()}
      </div>
    </div>
  )
}
