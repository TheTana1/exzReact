import React, { useEffect, useRef, useState } from 'react';



export default function Spinner() {
    return (
        <div>
            <div class="loading">
                { 
                    <img id="loading-img" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTJ3Z2IzZnNiMXAyd250ZHE3dHBsYjFta3lmMWl0c3Ixam9xY3U1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/200w.webp" alt="Loading" />
                }
            </div>
        </div>
    );
};

