import { Upload as UploadIcon, Image, X, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        // TODO: Implement actual API call to backend
        setTimeout(() => {
            setIsAnalyzing(false);
            // Redirect to results page
            console.log('Analysis complete');
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Upload Screenshot
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Upload a screenshot of your UI/UX design to get instant AI-powered analysis and feedback.
                </p>
            </div>

            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
                {!preview ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`text-center transition-colors ${isDragging ? 'bg-indigo-50 dark:bg-indigo-950' : ''
                            }`}
                    >
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-4">
                            <UploadIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Drag and drop your screenshot here
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            or click to browse from your computer
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                        >
                            Choose File
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            Supported formats: PNG, JPG, JPEG, WebP (Max 10MB)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Preview */}
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <button
                                onClick={handleRemoveFile}
                                className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* File Info */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <Image className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{file?.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {(file?.size || 0 / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        {/* Analyze Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                'Start Analysis'
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl mb-3">🎯</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Usability Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get insights on button placement, navigation flow, and user interaction patterns.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl mb-3">🎨</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Design Quality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Evaluate visual hierarchy, color contrast, typography, and overall aesthetics.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl mb-3">♿</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check WCAG compliance, color contrast ratios, and screen reader compatibility.
                    </p>
                </div>
            </div>
        </div>
    );
}
