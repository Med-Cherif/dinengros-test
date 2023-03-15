import Image from 'next/image';
import React from 'react';
import NoResultIcon from "../../public/assets/images/icons/no-result.svg";
import FlexBox from './FlexBox';

const NoResults = () => {
  return (
    <FlexBox justifyContent="center" alignItems="center" flexDirection="column">
        <h3 color='gray'>No Results found {':('}</h3>
        <Image 
            src={NoResultIcon}
            width='50'
            height='50'
        />
    </FlexBox>
  )
}

export default NoResults