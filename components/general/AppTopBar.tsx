import { Button, ButtonProps } from '@components/ui/button';
import { Label } from '@components/ui/label';
import React from 'react';

interface Props {
  title: string;
  buttonGroup: Array<ButtonProps>;
}

export const AppTopBar = ({ title, buttonGroup }: Props) => {
  return (
    <div className='flex items-center justify-between px-4 py-2 font-montserrat'>
      <Label className='font-bold text-lg'>{title}</Label>
      <div className='flex flex-row items-center gap-2'>
        {buttonGroup.map((props, index) => (
          <Button {...props} key={index} />
        ))}
      </div>
    </div>
  );
};
