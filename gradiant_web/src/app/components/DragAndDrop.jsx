import {useState} from 'react';
import { Dropzone } from '@files-ui/react';
import  { useRouter } from 'next/navigation';
import { useFile } from '../context/csvContex';


export const DragAndDrop = () => {
    const router = useRouter();
	const [files, setFiles] = useState([]);
    const { setFile } = useFile();

    const handleFileChange = (files) => {
		console.log(files)
		const file = files[0].file
		console.log(file)
        if (files.length > 0) {
            setFile(file);
            router.push('/dashboard');
        }
    }

    return (
		<Dropzone
			header={false}
			value={files}
			footer={false}
			maxFiles={1}
			label="Drop here your csv file"
			onChange={handleFileChange}
			className='h-[40vh]'
			color='white'
		/>
    );
}