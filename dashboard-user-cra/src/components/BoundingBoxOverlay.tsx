import React from 'react';

interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    type: string;
}

interface BoundingBoxOverlayProps {
    imageUrl: string;
    boxes: BoundingBox[];
}

export default function BoundingBoxOverlay({ imageUrl, boxes }: BoundingBoxOverlayProps) {
    return (
        <div className="relative inline-block w-full">
            <img
                src={imageUrl}
                alt="Analyzed UI"
                className="w-full h-auto rounded-lg shadow-lg"
            />
            {boxes.map((box, index) => (
                <div
                    key={index}
                    className="absolute border-2 border-indigo-500 bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors cursor-help group"
                    style={{
                        left: `${box.x}px`,
                        top: `${box.y}px`,
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                    }}
                >
                    <div className="absolute -top-7 left-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {box.label} ({box.type})
                    </div>
                </div>
            ))}
        </div>
    );
}
