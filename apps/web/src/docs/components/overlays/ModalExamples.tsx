import React, { useState } from 'react';
import { Modal, Button } from '@losensky-systems/web-components-core';

export const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header title="Modal Title">
          This is the modal content
        </Modal.Header>
        <Modal.Body>
          <p>This is the modal body content.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ModalSizesExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');

  const openModal = (modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    setSize(modalSize);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => openModal('sm')}>Small Modal</Button>
        <Button onClick={() => openModal('md')}>Medium Modal</Button>
        <Button onClick={() => openModal('lg')}>Large Modal</Button>
        <Button onClick={() => openModal('xl')}>Extra Large Modal</Button>
        <Button onClick={() => openModal('full')}>Full Screen Modal</Button>
      </div>
      
      <Modal open={isOpen} onOpenChange={setIsOpen} size={size}>
        <Modal.Header title={`${size.toUpperCase()} Modal`} />
        <Modal.Body>
          <p>This is a {size} modal. The size is {size}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const CustomWidthExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Custom Width Modal</Button>
      
      <Modal open={isOpen} onOpenChange={setIsOpen} width="700px">
        <Modal.Header title="Custom Width Modal" />
        <Modal.Body>
          <p>This modal has a custom width of 700px.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const SimpleModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Simple Modal</Button>
      
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Body>
          <h2 className="text-lg font-semibold mb-4">Simple Modal</h2>
          <p>This modal doesn't have a header or footer component.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const ScrollableModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Scrollable Modal</Button>
      
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header title="Scrollable Content" />
        <Modal.Body>
          <div className="space-y-4">
            {Array.from({ length: 15 }, (_, i) => (
              <p key={i}>This is paragraph {i + 1} in a long scrollable content.</p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
