import { Body, DirectoryItemContainer, BackgroundImage } from './directory-item.styles';
import { DirectoryCategory } from '../directory/directory.component';

import { FC } from 'react';

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <Body to={`shop/${title.toLowerCase()}`}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;