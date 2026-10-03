import React from 'react';
import { X } from 'lucide-react';
import { sound } from '../utils/audio';

export default function DialogModal({
  isOpen,
  onClose,
  title,
  message,
  avatar = '👨‍🍳',
  speakerName = 'Koki Balthazar'
}) {
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button top-right */}
        <button
          onClick={() => {
            sound.play('click');
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#442814',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Dialog Content */}
        <div className="dialog-layout">
          <div className="dialog-avatar-box">
            {avatar}
          </div>
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <h4 className="font-pixel" style={{ fontSize: '12px', color: '#78350f', fontWeight: 'bold', marginBottom: '4px' }}>
              {speakerName || title}
            </h4>
            {title && speakerName && speakerName !== title && (
              <div className="font-sub" style={{ fontSize: '10px', color: '#573a24', marginBottom: '4px' }}>
                {title}
              </div>
            )}
            <p className="font-dialogue" style={{ fontSize: '19px', color: '#1a0a03', lineHeight: 1.25 }}>
              "{message}"
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '2px solid #caa771', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="pixel-btn btn-gold"
            style={{ padding: '8px 16px', fontSize: '11px' }}
          >
            Lanjutkan [OK]
          </button>
        </div>

      </div>
    </div>
  );
}
