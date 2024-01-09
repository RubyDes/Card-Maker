/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux'
import { insertImg } from '../../store/imgReducer';
import { RootState } from '../../store/store'
import style from './Desc.module.css'

const DescInsertPic = (props: DispatchProps) => {

    const visibleDescInsertPic = useSelector((state: RootState) => state.buttonsReducer.visibleDescInsertPic);

    const inputRef = useRef<HTMLInputElement>(null);
    const selectedImageUrlRef = useRef<string>();
    const [loading, setLoading] = useState(false);

    function revokeImageUrl () {
        if (selectedImageUrlRef.current != null) {
            window.URL.revokeObjectURL(selectedImageUrlRef.current)
        }
    }

    function openSelectImageModal() {
        if (inputRef.current) {
            setLoading(true);
            inputRef.current.click()
        }
    }

    function updateSelectedImage() {

        revokeImageUrl();
        if (inputRef.current && inputRef.current.files) {
            const image = inputRef.current.files[0];
            if (image) {
                selectedImageUrlRef.current = window.URL.createObjectURL(image);

                let reader = new FileReader();
                reader.readAsDataURL(image);

                let imageWWW = new Image();
                imageWWW.src = selectedImageUrlRef.current;

                reader.onload = function() {
                    let readerResult = String(reader.result);
                    imageWWW.onload = function() {
                        props.insertImg(readerResult, imageWWW.width, imageWWW.height);
                    }
                }


            }
            setLoading(true);
        }
        setLoading(false)
    }

    useEffect(() => revokeImageUrl, [])
    
    return (
        <div className={style.desc} style={ visibleDescInsertPic ? {display: "block"} : {display: "none"}}>
            <button 
                className={style.button} 
                onClick={openSelectImageModal} 
                disabled={loading}
            >
                Insert image
            </button>
            
            <input
                ref={inputRef}
                accept=".jpg,.png"
                type="file"
                multiple={false}
                onChange={updateSelectedImage}
                style={{display: 'none'}}
            />
        </div>
    )
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: Function) => {
    return {
        insertImg: (newSrc: string, width: number, height: number) => dispatch(insertImg(newSrc, width, height)),
    }
}

export default connect(null, mapDispatchToProps)(DescInsertPic);