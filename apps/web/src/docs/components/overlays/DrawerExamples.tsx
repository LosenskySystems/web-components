import React, { useState } from 'react';
import { Drawer, Button, Input, Form } from '@losensky-systems/web-components-core';

export const BasicDrawerExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Header title="Drawer Title" />
        <Drawer.Body>
          <p>This is the drawer content. You can put any content here.</p>
          <p>The drawer slides in from the right by default.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary">Save</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const DrawerSidesExample: React.FC = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <Button onClick={() => setLeftOpen(true)}>Open Left Drawer</Button>
      <Button onClick={() => setRightOpen(true)}>Open Right Drawer</Button>

      <Drawer open={leftOpen} onOpenChange={setLeftOpen} side="left">
        <Drawer.Header title="Left Drawer" />
        <Drawer.Body>
          <p>This drawer slides in from the left side.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setLeftOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>

      <Drawer open={rightOpen} onOpenChange={setRightOpen} side="right">
        <Drawer.Header title="Right Drawer" />
        <Drawer.Body>
          <p>This drawer slides in from the right side.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setRightOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export const DrawerSizesExample: React.FC = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  const [isOpen, setIsOpen] = useState(false);

  const openWithSize = (selectedSize: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    setSize(selectedSize);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => openWithSize('sm')} size="sm">Small</Button>
        <Button onClick={() => openWithSize('md')} size="sm">Medium</Button>
        <Button onClick={() => openWithSize('lg')} size="sm">Large</Button>
        <Button onClick={() => openWithSize('xl')} size="sm">Extra Large</Button>
        <Button onClick={() => openWithSize('full')} size="sm">Full Width</Button>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen} size={size}>
        <Drawer.Header title={`${size.toUpperCase()} Drawer`} />
        <Drawer.Body>
          <p>This is a {size} sized drawer.</p>
          <p>Try different sizes to see the width differences.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const CustomWidthDrawerExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Custom Width Drawer</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen} width="600px">
        <Drawer.Header title="Custom Width Drawer" />
        <Drawer.Body>
          <p>This drawer has a custom width of 600px.</p>
          <p>You can specify width in pixels or any CSS unit.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const DrawerWithFormExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Drawer</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Header title="Edit Profile" />
        <Drawer.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Field label="Full Name" required>
              <Input placeholder="Enter your name" />
            </Form.Field>
            <Form.Field label="Email" required>
              <Input type="email" placeholder="Enter your email" />
            </Form.Field>
            <Form.Field label="Bio">
              <Input placeholder="Tell us about yourself" />
            </Form.Field>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const ScrollableDrawerExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Drawer</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Header title="Long Content Drawer" />
        <Drawer.Body scrollable maxHeight="400px">
          <div className="space-y-4">
            <p>This drawer has a lot of content that requires scrolling.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

