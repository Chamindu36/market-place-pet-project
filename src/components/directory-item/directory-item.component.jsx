import { Body, DirectoryItemContainer, BackgroundImage } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <Body to={`shop/${title.toLowerCase()}`}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;