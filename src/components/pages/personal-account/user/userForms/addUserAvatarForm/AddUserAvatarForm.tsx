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
import { CanvasProps } from './canvasProps';
import './AddUserAvatarForm.css';
import Box from '@mui/material/Box';
import { MainColors } from '../../../../../../lib/Colors/MainColors';

const AddUserAvatarForm: FC = () => {
    const { store } = useContext(Context);
    const { name } = store.user;
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [crop, setCrop] = useState<Crop>();
    const [imgSrc, setImgSrc] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const [isCroppedImage, setIsCroppedImage] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('avatar');
    const [isCropClicked, setIsCropClicked] = useState<boolean>(false);
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
                    naturalWidth < CanvasProps.MIN_DIMENSION ||
                    naturalHeight < CanvasProps.MIN_DIMENSION
                ) {
                    setErrorMessage('Image must be at least 150 x 150 pixels');
                    return setImgSrc('');
                }

                if (
                    naturalWidth > CanvasProps.MAX_DIMENSION ||
                    naturalHeight > CanvasProps.MAX_DIMENSION
                ) {
                    setErrorMessage(
                        'Image must be at least 1500 x 1500 pixels',
                    );
                    return setImgSrc('');
                }
            });

            setImgSrc(imageUrl);
            setFileName(file.name);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        const cropWidthInPercent = (CanvasProps.MIN_DIMENSION / width) * 100;

        if (
            naturalWidth < CanvasProps.MIN_DIMENSION ||
            naturalHeight < CanvasProps.MIN_DIMENSION
        ) {
            setErrorMessage('Image must be at least 150 x 150 pixels');
            setImgSrc('');
            return;
        }
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent,
            },
            CanvasProps.ASPECT_RATIO,
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
                `${name}-${fileName}-avatar.jpg`,
            );
            setIsCropClicked(true);
            setIsCroppedImage(true);
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

    return (
        <>
            <form>
                <FormControl sx={{ pb: 1 }}>
                    <input
                        onChange={onSelectFile}
                        type="file"
                        id="file"
                        accept="image/*"
                        className={'file-input__input'}
                    />
                    <label className="button label" htmlFor="file">
                        <span>Upload your image</span>
                        <span className="ext">
                            [&quot;jpeg&quot;, &quot;png&quot;,
                            &quot;webp&quot;]
                        </span>
                    </label>
                </FormControl>
                <Box
                    sx={{
                        backgroundColor: MainColors.GRAY808,
                    }}
                >
                    {imgSrc && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '10px',
                            }}
                        >
                            <ReactCrop
                                crop={crop}
                                onChange={(pixelCrop, percentCrop) =>
                                    setCrop(pixelCrop)
                                }
                                circularCrop
                                keepSelection
                                aspect={CanvasProps.ASPECT_RATIO}
                                minWidth={CanvasProps.MIN_DIMENSION}
                            >
                                <img
                                    ref={imageRef}
                                    src={imgSrc}
                                    alt={'Crop image'}
                                    onLoad={onImageLoad}
                                    style={{
                                        maxHeight: 'clamp(35vh, 50vw, 45vh)',
                                    }}
                                />
                            </ReactCrop>
                        </div>
                    )}
                    {crop && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
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
                        </div>
                    )}
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    {imgSrc && (
                        <Button variant={'contained'} onClick={handleCrop}>
                            Crop
                        </Button>
                    )}
                    {isCropClicked && (
                        <Button variant={'contained'} onClick={handleSubmit}>
                            Upload photo
                        </Button>
                    )}
                </Box>
                {errorMessage && (
                    <FormHelperText style={{ color: 'red ' }}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </form>
        </>
    );
};

export default AddUserAvatarForm;
