import {useState} from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import  { useRouter } from 'next/navigation';

export const DragAndDrop = () => {
    const [files, setFiles] = useState([]);
	const router = useRouter();

    const updateFiles = () => {
        router.push('/dashboard'); 
	}

    return (
		<Dropzone
			header={false}
			footer={false}
			maxFiles={1}
			label="Drop here your csv file"
			accept='.csv'
			onChange={updateFiles}
		/>
	)
}