'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function InstructionsPage() {
    return (
        <BookingLayout
            stepTitle="Special Instructions"
            stepDescription="Let us know if there's anything special to consider."
            nextHref="/app/book/review"
            backHref="/app/book/services"
        >
            <div className="space-y-6">
                <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                    </label>
                    <Textarea
                        id="instructions"
                        rows={6}
                        placeholder="e.g., 'Please use cold wash for the blue sweater.' or 'Small hole in the left knee of the jeans.'"
                    />
                    <p className="mt-2 text-sm text-muted-foreground">0 / 500 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Photos (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB. Helpful for pointing out stains.</p>
                        </div>
                    </div>
                </div>
            </div>
        </BookingLayout>
    )
}
