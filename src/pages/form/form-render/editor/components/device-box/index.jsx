import React from "react";
import clsx from "clsx";
import "./index.css";
import Icon from "@/common/components/icon";

const DeviceBox = React.forwardRef(function ({ device, className, children, ...props }, ref) {
  return (
    <div ref={ref} {...props} className={clsx(device && "form-editor-device-box", device === "pad" && "form-editor-device-box-pad", className)}>
      {device && (
        <div className="form-editor-device-box-status">
          <div className="form-editor-device-box-status-block">
            <span className="form-editor-device-box-status-camera"></span>
            <span className="form-editor-device-box-status-time">12:00:00</span>
          </div>
          <div className="form-editor-device-box-status-block">
            <Icon className="device-box-status-icon" type="icon-sound-Mute" />
            <Icon className="device-box-status-icon" type="icon-Exportservices" />
            <span className="form-editor-device-box-status-power"></span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
});

export default DeviceBox;
