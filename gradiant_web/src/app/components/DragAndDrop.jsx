import {useState} from 'react';
import { Dropzone } from '@files-ui/react';
import  { useRouter } from 'next/navigation';
import { useFile } from '../context/csvContex';


export const DragAndDrop = () => {
	const router = useRouter();
	const { setFile } = useFile();

    const handleFileChange  = (files) => {
        if (files.length > 0) {
            const file = files[0];
			setFile(file);
            router.push('/dashboard');
        }
	}

    return (
		<Dropzone
			header={false}
			footer={false}
			maxFiles={1}
			label="Drop here your csv file"
			accept='.csv'
			onChange={handleFileChange}
		/>
	)
}