import { ImageList, ImageListItem, Modal } from '@mui/material';
import React from 'react';

interface CustomModalProps {
    open: boolean,
    images: string[],
    handleClose: () => void,
    error?: string
}

export const CustomModal = ({open, images, handleClose, error}: CustomModalProps) => {
    return (
        <Modal
            className='modal'
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.map((image) => (
                <ImageListItem key={image}>
                <img
                    src={image}
                    alt={''}
                />
                </ImageListItem>
            ))}
            </ImageList>
        </Modal>
    )
}