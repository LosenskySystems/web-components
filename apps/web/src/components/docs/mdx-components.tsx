import { Button, Input, Divider, Label, LabelGroup, Loader, Select, Textarea, Tooltip, Badge, Card, Avatar, Icon, Dropdown, DropdownItem, DropdownDivider, DropdownMenu, Alert, Toast, Checkbox, Radio, Slider, Toggle, DateTimePicker, Form, FormField, FormSection, FormActions, Modal, ModalHeader, ModalBody, ModalFooter, Drawer, DrawerHeader, DrawerBody, DrawerFooter, Container, Grid, Stack, PageHeader, Flex, Progress, Navbar, Sidebar, Breadcrumbs, Pagination, Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, Accordion, AccordionItem, EmptyState, Callout } from '@losensky-systems/web-components-core'
import { BasicSidebarExample, SidebarWithIconsExample, CollapsibleSidebarExample, SidebarPositionExample, SidebarVariantExample, GroupedSidebarExample, CompleteSidebarExample, SidebarWidthExample } from '../../docs/components/navigation/SidebarExamples'
import { BasicBreadcrumbsExample, BreadcrumbsWithIconsExample, BreadcrumbsSeparatorExample, BreadcrumbsSizeExample, BreadcrumbsMaxItemsExample, BreadcrumbsClickableExample, BreadcrumbsDisabledExample } from '../../docs/components/navigation/BreadcrumbsExamples'
import { CodeBlock } from './CodeBlock'
import { PropsTable } from './PropsTable'

// MDX components mapping with Tailwind classes
export const mdxComponents = {
  Button,
  Input,
  Divider,
  Label,
  LabelGroup,
  Loader,
  Select,
  Textarea,
  Tooltip,
  Badge,
  Card,
  Avatar,
  Icon,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  DropdownMenu,
  Alert,
  Toast,
  Checkbox,
  Radio,
  Slider,
  Toggle,
  DateTimePicker,
  Form,
  FormField,
  FormSection,
  FormActions,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Container,
  Grid,
  Stack,
  PageHeader,
  Flex,
  Progress,
  Navbar,
  Sidebar,
  BasicSidebarExample,
  SidebarWithIconsExample,
  CollapsibleSidebarExample,
  SidebarPositionExample,
  SidebarVariantExample,
  GroupedSidebarExample,
  CompleteSidebarExample,
  SidebarWidthExample,
  Breadcrumbs,
  Pagination,
  BasicBreadcrumbsExample,
  BreadcrumbsWithIconsExample,
  BreadcrumbsSeparatorExample,
  BreadcrumbsSizeExample,
  BreadcrumbsMaxItemsExample,
  BreadcrumbsClickableExample,
  BreadcrumbsDisabledExample,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPanel,
  Accordion,
  AccordionItem,
  EmptyState,
  Callout,
  CodeBlock,
  PropsTable,
  // Typography
  h1: (props: any) => (
    <h1 
      className="text-4xl font-bold text-slate-900 mb-6 mt-0 leading-tight tracking-tight"
      {...props} 
    />
  ),
  h2: (props: any) => (
    <h2 
      className="text-2xl font-semibold text-slate-800 mb-6 mt-12 leading-snug border-b border-slate-200 pb-3"
      {...props} 
    />
  ),
  h3: (props: any) => (
    <h3 
      className="text-xl font-semibold text-slate-700 mb-4 mt-8 leading-normal"
      {...props} 
    />
  ),
  h4: (props: any) => (
    <h4 
      className="text-lg font-semibold text-slate-700 mb-3 mt-6"
      {...props} 
    />
  ),
  p: (props: any) => (
    <p 
      className="text-slate-600 leading-relaxed mb-6 text-base"
      {...props} 
    />
  ),
  // Code styling - Light theme sleek
  code: (props: any) => (
    <code 
      className="bg-slate-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
      {...props} 
    />
  ),
  pre: (props: any) => (
    <pre 
      className="bg-slate-50 text-slate-900 p-6 rounded-xl overflow-auto mb-8 text-sm leading-relaxed font-mono border border-slate-200 shadow-sleek"
      {...props} 
    />
  ),
  // Table styling
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table 
        className="w-full border-collapse text-sm bg-white border border-slate-200 rounded-lg overflow-hidden"
        {...props} 
      />
    </div>
  ),
  th: (props: any) => (
    <th 
      className="bg-slate-50 px-4 py-3 text-left font-semibold text-gray-700 border-b border-slate-200 text-sm"
      {...props} 
    />
  ),
  td: (props: any) => (
    <td 
      className="px-4 py-3 border-b border-slate-100 text-slate-600 align-top"
      {...props} 
    />
  ),
}
