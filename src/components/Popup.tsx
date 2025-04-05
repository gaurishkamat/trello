import { ReactNode } from "react";

interface PopupType {
  children?: ReactNode;
  open?: boolean;
  title?: string;
  onClose?: () => void;
  height?: string;
  width?: string;
  footer?: ReactNode;
}

export function Popup({
  children,
  open,
  title,
  onClose,
  height,
  width,
  footer,
}: PopupType) {
  return (
    <div
      className="popup-container"
      style={{ display: open ? "flex" : "none" }}
    >
      <div className="popup" style={{ height: height, width: width }}>
        <div className="popup-header">
          <div>{title}</div>
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            x
          </div>
        </div>
        <div className="popup-body">{children}</div>
        <div className="popup-footer">{footer}</div>
      </div>
    </div>
  );
}
