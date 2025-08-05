// NoteForm.tsx
import React from 'react';

// Define the NoteInput interface (should match your existing one)
interface NoteInput {
  _id: string;
  title: string;
  description: string;
}

interface EditNoteInput {
  _id: string;
  title: string;
  description: string;
}

// Define the props interface for the universal Form component
interface NoteFormProps {
  // Form data and handlers
  formData: NoteInput;
  editNotes: EditNoteInput;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancel: () => void;
  
  // Form configuration
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
  
  // Optional customization
  submitButtonText?: string;
  cancelButtonText?: string;
  className?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  mode,
  isSubmitting = false,
  submitButtonText,
  cancelButtonText = 'Cancel',
  className = '',
}) => {
  // Dynamic text based on mode
  const formTitle = mode === 'create' ? 'Create New Note' : 'Edit Note';
  const defaultSubmitText = mode === 'create' ? 'Create' : 'Save';
  const finalSubmitText = submitButtonText || defaultSubmitText;

  // Dynamic IDs to avoid conflicts when both forms might be on the page
  const titleId = `${mode}-title`;
  const descriptionId = `${mode}-description`;

  return (
    <div className={` rounded-md p-4 ${className}`}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <h3 className="font-medium text-lg mb-2">{formTitle}</h3>

        <div className="flex flex-col relative">
          <label 
            htmlFor={titleId}
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] md:left-[1%] left-[2%]"
          >
            Title
          </label>
          <input
            id={titleId}
            type="text"
            name="title"
            value={formData.title}
            onChange={onFormChange}
            disabled={isSubmitting}
            required
            placeholder="Enter note title..."
            className="border p-2 rounded border-gray-400 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col relative">
          <label 
            htmlFor={descriptionId}
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] md:left-[1%] left-[2%]"
          >
            Description
          </label>
          <textarea
            id={descriptionId}
            name="description"
            value={formData.description}
            onChange={onFormChange}
            disabled={isSubmitting}
            required
            rows={4}
            placeholder="Enter note description..."
            className="border p-2 rounded border-gray-400 focus:border-blue-500 focus:outline-none resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex md:justify-end justify-between gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed md:py-2 p-2 md:px-4 md:w-fit w-full text-white rounded-lg transition-colors"
          >
            {cancelButtonText}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed md:py-2 p-2 md:px-4 md:w-fit w-full text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                  </circle>
                </svg>
                {mode === 'create' ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              finalSubmitText
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;