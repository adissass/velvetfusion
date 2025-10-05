function PersonaImage({ src, alt }) {
    return src ? (
      <img src={src} alt={alt} className="w-full h-40 object-contain rounded-t mb-2" />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-t mb-2">
        N/A
      </div>
    );
  }