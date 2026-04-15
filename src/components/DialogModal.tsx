import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.dialog`
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(92vw, 440px);
  max-height: min(90vh, 640px);
  border: none;
  border-radius: 24px;
  padding: 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  color: #0f172a;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
  overflow: hidden;

  &::backdrop {
    background: rgba(15, 23, 42, 0.62);
    backdrop-filter: blur(4px);
  }
`;

const Content = styled.div`
  padding: 1.75rem;
`;

const Badge = styled.div`
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 800;
  color: #111827;
`;

const Description = styled.div`
  margin-top: 0.75rem;
  color: #475569;
  line-height: 1.6;
  font-size: 0.975rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;

  button {
    min-width: 7.5rem;
    border: none;
    border-radius: 9999px;
    padding: 0.8rem 1.2rem;
    font-weight: 700;
    transition: transform 0.15s ease, box-shadow 0.15s ease,
      background-color 0.15s ease;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:focus-visible {
    outline: 3px solid rgba(239, 68, 68, 0.25);
    outline-offset: 2px;
  }
`;

const ConfirmButton = styled.button`
  background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 10px 24px rgba(220, 38, 38, 0.28);

  &:hover {
    background: linear-gradient(180deg, #f05252 0%, #b91c1c 100%);
  }
`;

const CloseButton = styled.button`
  background: #e2e8f0;
  color: #0f172a;

  &:hover {
    background: #cbd5e1;
  }
`;

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  children: ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <Container
      ref={ref}
      onCancel={onClose}
      onClick={(e: MouseEvent) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      aria-labelledby="confirm-delete-title"
    >
      <Content>
        <Badge>!</Badge>
        <Title id="confirm-delete-title">{title}</Title>
        <Description>{children}</Description>

        <Actions>
          <CloseButton type="button" onClick={onClose}>
            Cancelar
          </CloseButton>
          <ConfirmButton type="button" onClick={proceedAndClose}>
            Eliminar
          </ConfirmButton>
        </Actions>
      </Content>
    </Container>
  );
};

export default DialogModal;