import React, { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import { Context } from '../../../../../../index';
import { toast } from 'react-toastify';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    Crop,
    makeAspectCrop,
    PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { setCanvasPreview } from './setCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const AddUserAvatarForm: FC = () => {
    const { store } = useContext(Context);
    const { name } = store.user;
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [crop, setCrop] = useState<Crop>();
    const [imgSrc, setImgSrc] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || '';
            imageElement.src = imageUrl;

            console.log(imageUrl);

            imageElement.addEventListener('load', (e: Event) => {
                if (errorMessage) setErrorMessage('');
                const target = e.target as HTMLImageElement;
                const { naturalWidth, naturalHeight } = target;
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    setErrorMessage('Image must be at least 150 x 150 pixels');
                    return setImgSrc('');
                }
            });

            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setErrorMessage('Image must be at least 150 x 150 pixels');
            setImgSrc('');
            return;
        }
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height,
        );

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleCrop = () => {
        if (imageRef.current && canvasRef.current && crop) {
            setCanvasPreview({
                image: imageRef.current,
                canvas: canvasRef.current,
                crop: crop as PixelCrop,
            });

            const croppedImageDataUrl = canvasRef.current.toDataURL();

            const croppedImageFile = dataURLtoFile(
                croppedImageDataUrl,
                `${name}-avatar.jpg`,
            );
            setCroppedImage(croppedImageFile);
        }
    };

    const dataURLtoFile = (dataURL: string, filename: string): File => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleSubmit = async () => {
        try {
            if (croppedImage) {
                const response = await store.addProfileImage(croppedImage);
            } else {
                toast.error('Please crop the image before uploading.');
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
    };

    console.log(croppedImage);

    return (
        <>
            <form>
                <FormControl>
                    <InputLabel htmlFor="file">Choose your avatar</InputLabel>
                    <input
                        onChange={onSelectFile}
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: 'block' }}
                    />
                </FormControl>
                {imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) =>
                            setCrop(pixelCrop)
                        }
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imageRef}
                            src={imgSrc}
                            alt={'Crop image'}
                            style={{ maxHeight: '60vh' }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
                {errorMessage && (
                    <FormHelperText style={{ color: 'red ' }}>
                        {errorMessage}
                    </FormHelperText>
                )}
                <Button
                    variant={'contained'}
                    // onClick={() => {
                    //     if (imageRef.current && canvasRef.current && crop) {
                    //         setCanvasPreview({
                    //             image: imageRef.current,
                    //             canvas: canvasRef.current,
                    //             crop: crop as PixelCrop,
                    //         });
                    //     }
                    // }}
                    onClick={handleCrop}
                >
                    Crop
                </Button>
                <Button variant={'contained'} onClick={handleSubmit}>
                    Upload
                </Button>

                {crop && (
                    <canvas
                        ref={canvasRef}
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: '250px',
                            height: '250px',
                            borderRadius: '50%',
                        }}
                    />
                )}
            </form>
        </>
    );
};

export default AddUserAvatarForm;
