import React, {useState} from 'react';
import Box from "@mui/material/Box";

interface ImageFormProps {
    onSubmit: (image: File) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({onSubmit}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onSubmit(file);
        }
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
            />
            {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{maxWidth: '200px', marginTop: '1rem'}}/>
            )}
        </Box>
    );
};

export default ImageForm;