"use client"

import Image from "next/image";

interface NotFoundProps{
    displayText: string
}

export default function NotFound({ displayText }: NotFoundProps){


    return (
        <div className="flex flex-grow flex-col items-center justify-center gap-6">
            <h2 className="font-semibold text-customBlue text-center">{ displayText }</h2>

            <Image
                src="/img/logo_carro.png"
                width={120}
                height={120}
                unoptimized={true}
                alt=""
            />
        </div>
    )
}