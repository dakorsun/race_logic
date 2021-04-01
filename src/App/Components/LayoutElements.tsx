import React from 'react';

interface IBlockBuilderProps {
  type: string
}
interface IBlockBuilderChildProps {
  children: JSX.Element | React.ReactNode
  className?: string
  column?: boolean
  right?: boolean
}
const BlockBuilder = ({ type }: IBlockBuilderProps) => {
  function BlockBuilderChild({
    children, className, column, right,
  }: IBlockBuilderChildProps) {
    let resultClassName = `${type}`;
    if (className) resultClassName = resultClassName.concat(` ${className}`);
    if (column) resultClassName = resultClassName.concat(' column');
    if (right) resultClassName = resultClassName.concat(' right');
    // console.log(`${type} type className: "${resultClassName}",\ncolumn: ${column}\n,right: ${right}\n`);
    return (
      <div className={resultClassName}>
        {children}
      </div>
    );
  }
  BlockBuilderChild.defaultProps = {
    className: '',
    column: false,
    right: false,
  };
  return BlockBuilderChild;
};

export const RowElement = BlockBuilder({ type: 'row_element' });
export const RowBlockChild = BlockBuilder({ type: 'block' });
