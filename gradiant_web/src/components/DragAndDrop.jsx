import {useState} from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';

export const DragAndDrop = () => {
    const [files, setFiles] = useState([]);
    const updateFiles = () => {
		const file = files[0].file
        console.log("Descomentar la siguiente línea para ejecutar la función con el archivo seleccionado:")
		//if (file != null) funcionAEjecutar(file)
	}

    return (
		<Dropzone
			header={false}
			footer={false}
			maxFiles={1}
			label="Drop here your csv file"
			accept="image/*"
			onChange={updateFiles}
		/>
	)
}