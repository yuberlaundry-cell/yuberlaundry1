
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface AddressInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressSelect: (address: {
    description: string;
    place_id: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
  ({ className, onAddressSelect, value, onChange, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const geocoder = useRef<google.maps.Geocoder | null>(null);
    
    // Fallback for uncontrolled component
    const [internalValue, setInternalValue] = useState(props.defaultValue || '');
    const controlledValue = value === undefined ? internalValue : value;

    useEffect(() => {
      const loadGoogleMapsScript = () => {
        const scriptId = 'google-maps-script';
        
        if (window.google?.maps?.places) {
          setIsScriptLoaded(true);
          return;
        }
        
        if (document.getElementById(scriptId)) {
             const checkInterval = setInterval(() => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    setIsScriptLoaded(true);
                    clearInterval(checkInterval);
                }
            }, 100);
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsScriptLoaded(true);
        document.head.appendChild(script);
      };

      loadGoogleMapsScript();
    }, []);
    
    useEffect(() => {
        if (isScriptLoaded && !autocompleteService.current) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            geocoder.current = new window.google.maps.Geocoder();
        }
    }, [isScriptLoaded]);
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      
      if (onChange) {
        onChange(event);
      } else {
        setInternalValue(inputValue);
      }

      if (autocompleteService.current && inputValue) {
        autocompleteService.current.getPlacePredictions(
          { input: inputValue },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      } else {
        setSuggestions([]);
      }
    };

    const handleSuggestionClick = (suggestion: google.maps.places.AutocompletePrediction) => {
        if (geocoder.current) {
            geocoder.current.geocode({ placeId: suggestion.place_id }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const location = results[0].geometry.location;
                    const coordinates = { lat: location.lat(), lng: location.lng() };
                    
                    onAddressSelect({
                        description: suggestion.description,
                        place_id: suggestion.place_id,
                        coordinates,
                    });
                    setSuggestions([]);
                }
            });
        }
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          value={controlledValue}
          onChange={handleInputChange}
          className={cn('pr-10', className)}
          {...props}
          disabled={!isScriptLoaded || props.disabled}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-muted"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
AddressInput.displayName = 'AddressInput';

export { AddressInput };
