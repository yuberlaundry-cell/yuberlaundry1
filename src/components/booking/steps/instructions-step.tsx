
'use client';

import { Textarea } from "@/components/ui/textarea";
import { Upload, X, File as FileIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function InstructionsStep() {
    const [notes, setNotes] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFiles(prev => [...prev, ...Array.from(event.target.files!)]);
        }
    };

    const handleRemoveFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    };

    return (
        <div className="space-y-8">
             <div>
                <h2 className="text-2xl font-bold font-headline">Any special instructions?</h2>
                <p className="text-muted-foreground mt-1">Let us know if there's anything special to consider.</p>
            </div>
            <div className="space-y-6">
                <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                    </label>
                    <Textarea
                        id="instructions"
                        rows={6}
                        placeholder="e.g., 'Please use cold wash for the blue sweater.' or 'Small hole in the left knee of the jeans.'"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        maxLength={500}
                    />
                    <p className="mt-2 text-sm text-muted-foreground text-right">{notes.length} / 500 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Photos (Optional)
                    </label>
                    <div 
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files) {
                                setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
                            }
                        }}
                    >
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                    <span>Upload a file</span>
                                    <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB. Helpful for pointing out stains.</p>
                        </div>
                    </div>
                     {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h4 className="font-medium text-sm">Selected files:</h4>
                            <ul className="space-y-2">
                                {uploadedFiles.map(file => (
                                    <li key={file.name} className="flex items-center justify-between p-2 border rounded-md bg-muted/50 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{file.name}</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFile(file.name)}>
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
