import Image from 'next/image'

export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center relative top-0">
            <div className=" flex flex-col justify-center items-center absolute">
                <Image
                    src="/loading.svg"
                    width="200px"
                    height="200px"
                    alt="Colony"
                    className="m-auto inline-block"
                />
                <div className="font-bold text-lg text-primary-900">Loading <span className="font-lg text-2xl animate-pulse">...</span></div>
            </div>
        </div>
    )
}
