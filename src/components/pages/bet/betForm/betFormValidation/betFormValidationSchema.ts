// import * as yup from 'yup';
//
// interface ValidFileExtensions {
//     [key: string]: string[];
// }
//
// const validFileExtensions: ValidFileExtensions = {
//     image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp']
// };
//
// function isValidFileType(fileName: string, fileType: string): boolean {
//     const extensions = validFileExtensions[fileType];
//     if (!extensions) return false; // Проверяем, есть ли расширения для указанного типа
//
//     const fileExtension = fileName.split('.').pop()?.toLowerCase();
//     if (!fileExtension) return false; // Если нет расширения, считаем файл невалидным
//
//     return extensions.includes(fileExtension);
// }
//
// const MAX_FILE_SIZE = 102400;
//
// export const betFormValidationSchema = yup.object().shape({
//     email: yup
//         .string()
//         .required('Required field')
//         .email('Invalid email format'),
//
//     password: yup
//         .string()
//         .required('Required field')
//         .min(6, 'Not shorter than 6 characters!')
//         .max(32, 'No longer than 32 characters!')
//         .matches(/^(?=.*\d)(?=.*[a-zA-Z]).*$/, 'At least one Latin letter and one number!'),
//     image: yup
//         .mixed()
//         .required('Required')
//         .test('is-valid-type', 'Not a valid image type',
//             value => value instanceof File && isValidFileType(value.name.toLowerCase(), 'image'))
//         .test('is-valid-size', 'Max allowed size is 100KB',
//             value => value instanceof File && value.size <= MAX_FILE_SIZE)
// });

import * as yup from 'yup';

interface ValidFileExtensions {
    [key: string]: string[];
}

const validFileExtensions: ValidFileExtensions = {
    image: ['.jpg', '.gif', '.png', '.jpeg', '.svg', '.webp']
};

function isValidFileType(fileName: string, fileType: any): boolean {
    const extensions = validFileExtensions[fileType];
    if (!extensions) return false; // Проверяем, есть ли расширения для указанного типа

    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    if (!fileExtension) return false; // Если нет расширения, считаем файл невалидным

    return extensions.includes(fileExtension);
}

export const betFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Required field')
        .email('Invalid email format'),

    password: yup
        .string()
        .required('Required field')
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(/^(?=.*\d)(?=.*[a-zA-Z]).*$/, 'At least one Latin letter and one number!'),

    image: yup
        .mixed()
        // .required("Required")
});