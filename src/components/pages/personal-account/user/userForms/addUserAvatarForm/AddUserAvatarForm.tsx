import React, { FC, useContext, useRef, useState } from 'react';
import { Context } from '../../../../../../index';
import { toast } from 'react-toastify';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Cropper from 'react-easy-crop';

interface IAddUserAvatar {
    file: File | null;
    crop: { x: number; y: number };
    zoom: number;
    croppedImage: string | null;
}

const AddUserAvatarForm: FC = () => {
    const { store } = useContext(Context);
    const [formData, setFormData] = useState<IAddUserAvatar>({
        file: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedImage: null,
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const imageRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (formData.file) {
            URL.revokeObjectURL(formData.file as unknown as string);
        }
        setFormData({ ...formData, file });
    };

    const handleCropChange = (crop: { x: number; y: number }) => {
        setFormData({ ...formData, crop });
    };

    const handleZoomChange = (zoom: number) => {
        setFormData({ ...formData, zoom });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.file) {
                setErrorMessage('Please select a file.');
                return;
            }

            if (!formData.croppedImage) {
                setErrorMessage('Please crop the image.');
                return;
            }

            const response = await store.addProfileImage(formData.file);
            setFormData({
                file: null,
                crop: { x: 0, y: 0 },
                zoom: 1,
                croppedImage: null,
            });
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
    };

    return (
        <>
            <form>
                <FormControl>
                    <InputLabel htmlFor="file">Choose your avatar</InputLabel>
                    <input
                        ref={imageRef}
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'block' }}
                    />
                </FormControl>
                {formData.file && (
                    <div
                        style={{
                            width: '320px',
                            height: '320px',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <Cropper
                            onCropChange={handleCropChange}
                            onZoomChange={handleZoomChange}
                            aspect={1}
                            crop={formData.crop}
                            zoom={formData.zoom}
                            image={URL.createObjectURL(formData.file)}
                        />
                    </div>
                )}
                {errorMessage && (
                    <FormHelperText style={{ color: 'red ' }}>
                        {errorMessage}
                    </FormHelperText>
                )}
                <Button variant={'contained'} onClick={handleSubmit}>
                    Upload
                </Button>
            </form>
        </>
    );
};

export default AddUserAvatarForm;
