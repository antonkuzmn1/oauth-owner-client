import {AppDispatch, RootState} from "../../utils/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {setAppMessage} from "../../slices/appSlice.ts";
import {Close} from "@mui/icons-material";

const Message = () => {
    const dispatch: AppDispatch = useDispatch();

    const message = useSelector((state: RootState) => state.app.message);

    if (message.length === 0) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-gray-300 bg-white max-w-md w-full">
                <div className={'border-b h-8 border-gray-300 flex justify-between items-center'}>
                    <h2 className={'h-full flex items-center justify-center px-2'}>
                        Message
                    </h2>
                    <div
                        className={'h-full flex items-center justify-center w-8 cursor-pointer hover:bg-gray-300 transition-colors duration-200'}
                        onClick={() => dispatch(setAppMessage(''))}
                    >
                        <Close/>
                    </div>
                </div>
                <div className="space-y-4 p-4">{message}</div>
                <div className="border-t h-8 border-gray-300 flex justify-between items-center">
                    <button
                        className={'h-full w-full cursor-pointer hover:bg-gray-300 transition-colors duration-200'}
                        onClick={() => dispatch(setAppMessage(''))}
                        children={'Close'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Message;
