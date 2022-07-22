import React from 'react';
import { Skeleton } from '@mui/material';

function SkeletonLoader(props) {
  const BpSkeleton = (
    <div style={{ padding: '3rem' }}>
      <div className="row mb-5">
        <div className="col-md-4"><Skeleton variant="text" height={55} /></div>
        <div className="col-md-3" />
        <div className="col-md-5">
          <div className="d-flex">
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
            <div className="px-2"><Skeleton variant="circle" width={35} height={35} /></div>
          </div>
        </div>

      </div>
      <div className="row mb-4">
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
        <div className="col-md-6"><Skeleton variant="text" height={45} /></div>
      </div>

    </div>
  );
  switch (props.type) {
    case 'Bp':
      return BpSkeleton;
    default:
      break;
  }
}

export default SkeletonLoader;
