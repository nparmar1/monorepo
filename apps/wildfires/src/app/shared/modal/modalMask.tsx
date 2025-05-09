import { MouseEvent, PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { modalAtom } from '../atoms/modalAtom';
import { mergeCss } from '../utils/styles/mergeCss';

interface IProps extends PropsWithChildren {
  className?: string;
  closeOnMaskClick?: boolean;
}

export function ModalMask(props: IProps) {
  const { className, closeOnMaskClick = false, children } = props;

  const [_modal, setModal] = useAtom(modalAtom);

  const parentCss: string = [
    // z-index should be above z-index of google skiptranslate bar, which is 10000001
    'z-[90000001]',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'fixed',
    'flex',
    'justify-center',
    'items-center',
    'bg-gray-500/20 backdrop-blur',
    className,
  ].join(' ');

  function onMaskClick(e: MouseEvent<HTMLDivElement>) {
    if (e) {
      e.stopPropagation();
    }

    if (!closeOnMaskClick) {
      return;
    }

    setModal(null);
  }

  return (
    <div className={mergeCss(parentCss)} onClick={onMaskClick}>
      {children}
    </div>
  );
}
