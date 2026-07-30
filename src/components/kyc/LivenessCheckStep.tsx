// // // // // import { useEffect, useState } from "react";
// // // // // import { CheckCircle, AlertCircle } from "lucide-react";
// // // // // import { useUser } from "../../context/UserContext";
// // // // // import { useCamera } from "../../hooks/useCamera";

// // // // // type SubStep = "positionFace" | "blink" | "turnHead";

// // // // // interface StepMeta {
// // // // //   key: SubStep;
// // // // //   label: string;
// // // // //   title: string;
// // // // //   subtitle: string;
// // // // //   detectedLabel: string;
// // // // // }

// // // // // const subSteps: StepMeta[] = [
// // // // //   {
// // // // //     key: "positionFace",
// // // // //     label: "Position Face",
// // // // //     title: "Position your face",
// // // // //     subtitle: "Center your face inside the frame and look straight ahead.",
// // // // //     detectedLabel: "Face detected",
// // // // //   },
// // // // //   {
// // // // //     key: "blink",
// // // // //     label: "Blink",
// // // // //     title: "Please blink naturally",
// // // // //     subtitle: "Keep looking at the camera and blink your eyes once.",
// // // // //     detectedLabel: "Blink detected",
// // // // //   },
// // // // //   {
// // // // //     key: "turnHead",
// // // // //     label: "Turn Head",
// // // // //     title: "Turn your head left, then right",
// // // // //     subtitle: "Slowly turn your head to the left, then back to the right.",
// // // // //     detectedLabel: "Head turn detected",
// // // // //   },
// // // // // ];

// // // // // // TODO (backend): Replace this simulated timer with a real liveness SDK call
// // // // // // (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// // // // // // the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// // // // // // here instead of the setTimeout below.
// // // // // const DETECTION_DELAY_MS = 2600;

// // // // // const LivenessCheckStep = () => {
// // // // //   const { markTier3StepComplete, submitTier3Verification } = useUser();
// // // // //   const { videoRef, status: cameraStatus } = useCamera();

// // // // //   const [subStepIndex, setSubStepIndex] = useState(0);
// // // // //   const [phase, setPhase] = useState<"checking" | "detected">("checking");

// // // // //   const current = subSteps[subStepIndex];

// // // // //   useEffect(() => {
// // // // //     if (cameraStatus !== "ready") return;
// // // // //     setPhase("checking");

// // // // //     const detectTimer = setTimeout(() => {
// // // // //       setPhase("detected");
// // // // //       markTier3StepComplete(current.key);

// // // // //       const advanceTimer = setTimeout(() => {
// // // // //         if (subStepIndex < subSteps.length - 1) {
// // // // //           setSubStepIndex((i) => i + 1);
// // // // //         } else {
// // // // //           submitTier3Verification();
// // // // //         }
// // // // //       }, 1000);

// // // // //       return () => clearTimeout(advanceTimer);
// // // // //     }, DETECTION_DELAY_MS);

// // // // //     return () => clearTimeout(detectTimer);
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [subStepIndex, cameraStatus]);

// // // // //   return (
// // // // //     <div>
// // // // //       {/* Stepper */}
// // // // //       <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
// // // // //         {subSteps.map((s, i) => {
// // // // //           const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
// // // // //           const isCurrent = i === subStepIndex && phase === "checking";
// // // // //           return (
// // // // //             <div key={s.key} className="flex items-center gap-2 sm:gap-4">
// // // // //               <div className="flex flex-col items-center gap-1">
// // // // //                 <span
// // // // //                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// // // // //                     isDone
// // // // //                       ? "bg-[#F59E0B] text-white"
// // // // //                       : isCurrent
// // // // //                       ? "bg-[#F59E0B] text-white"
// // // // //                       : "bg-gray-100 text-gray-400"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {isDone ? <CheckCircle size={16} /> : i + 1}
// // // // //                 </span>
// // // // //                 <span
// // // // //                   className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
// // // // //                     isDone || isCurrent ? "text-amber-600" : "text-gray-400"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {s.label}
// // // // //                 </span>
// // // // //               </div>
// // // // //               {i < subSteps.length - 1 && (
// // // // //                 <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
// // // // //               )}
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>

// // // // //       {/* Camera frame */}
// // // // //       <div
// // // // //         className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-video border-2 transition-colors ${
// // // // //           phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
// // // // //         }`}
// // // // //       >
// // // // //         <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
// // // // //           {phase === "detected" ? (
// // // // //             <CheckCircle size={12} className="text-[#22C55E]" />
// // // // //           ) : (
// // // // //             <AlertCircle size={12} className="text-amber-400" />
// // // // //           )}
// // // // //           Liveness
// // // // //         </span>

// // // // //         {cameraStatus === "ready" && (
// // // // //           <video
// // // // //             ref={videoRef}
// // // // //             autoPlay
// // // // //             playsInline
// // // // //             muted
// // // // //             className="w-full h-full object-cover scale-x-[-1]"
// // // // //           />
// // // // //         )}

// // // // //         {cameraStatus === "loading" && (
// // // // //           <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
// // // // //             Starting camera...
// // // // //           </div>
// // // // //         )}

// // // // //         {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
// // // // //           <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
// // // // //             <AlertCircle size={22} className="text-amber-400" />
// // // // //             <p className="text-sm text-white font-medium">
// // // // //               {cameraStatus === "denied"
// // // // //                 ? "Camera access was denied"
// // // // //                 : "Camera not supported on this device"}
// // // // //             </p>
// // // // //             <p className="text-xs text-white/60">
// // // // //               Please allow camera access in your browser settings and refresh to continue.
// // // // //             </p>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Face guide oval */}
// // // // //         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// // // // //           <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Demonstration card */}
// // // // //       <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
// // // // //         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
// // // // //           Demonstration
// // // // //         </p>
// // // // //         <span className="text-3xl mb-2">🙂</span>
// // // // //         <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

// // // // //         {phase === "detected" ? (
// // // // //           <>
// // // // //             <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
// // // // //               <CheckCircle size={15} /> {current.detectedLabel}
// // // // //             </span>
// // // // //             <p className="text-xs text-gray-400">Continuing...</p>
// // // // //           </>
// // // // //         ) : (
// // // // //           <>
// // // // //             <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
// // // // //             <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default LivenessCheckStep;




// // // // import { useEffect, useState } from "react";
// // // // import { CheckCircle, AlertCircle, UserRound } from "lucide-react";
// // // // import { useUser } from "../../context/UserContext";
// // // // import { useCamera } from "../../hooks/useCamera";

// // // // type SubStep = "positionFace" | "blink" | "turnHead";

// // // // interface StepMeta {
// // // //   key: SubStep;
// // // //   label: string;
// // // //   title: string;
// // // //   subtitle: string;
// // // //   detectedLabel: string;
// // // // }

// // // // const subSteps: StepMeta[] = [
// // // //   {
// // // //     key: "positionFace",
// // // //     label: "Position Face",
// // // //     title: "Position your face",
// // // //     subtitle: "Center your face inside the frame and look straight ahead.",
// // // //     detectedLabel: "Face detected",
// // // //   },
// // // //   {
// // // //     key: "blink",
// // // //     label: "Blink",
// // // //     title: "Please blink naturally",
// // // //     subtitle: "Keep looking at the camera and blink your eyes once.",
// // // //     detectedLabel: "Blink detected",
// // // //   },
// // // //   {
// // // //     key: "turnHead",
// // // //     label: "Turn Head",
// // // //     title: "Turn your head left, then right",
// // // //     subtitle: "Slowly turn your head to the left, then back to the right.",
// // // //     detectedLabel: "Head turn detected",
// // // //   },
// // // // ];

// // // // // TODO (backend): Replace this simulated timer with a real liveness SDK call
// // // // // (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// // // // // the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// // // // // here instead of the interval-based countdown below.
// // // // const DETECTION_DELAY_MS = 5000;
// // // // const TICK_MS = 100;

// // // // const LivenessCheckStep = () => {
// // // //   const { markTier3StepComplete, submitTier3Verification } = useUser();
// // // //   const { videoRef, status: cameraStatus } = useCamera();

// // // //   const [subStepIndex, setSubStepIndex] = useState(0);
// // // //   const [phase, setPhase] = useState<"checking" | "detected">("checking");
// // // //   const [progress, setProgress] = useState(0);

// // // //   const current = subSteps[subStepIndex];

// // // //   useEffect(() => {
// // // //     if (cameraStatus !== "ready") return;
// // // //     setPhase("checking");
// // // //     setProgress(0);

// // // //     const startedAt = Date.now();
// // // //     const tickInterval = setInterval(() => {
// // // //       const elapsed = Date.now() - startedAt;
// // // //       setProgress(Math.min(100, Math.round((elapsed / DETECTION_DELAY_MS) * 100)));
// // // //     }, TICK_MS);

// // // //     const detectTimer = setTimeout(() => {
// // // //       clearInterval(tickInterval);
// // // //       setProgress(100);
// // // //       setPhase("detected");
// // // //       markTier3StepComplete(current.key);

// // // //       const advanceTimer = setTimeout(() => {
// // // //         if (subStepIndex < subSteps.length - 1) {
// // // //           setSubStepIndex((i) => i + 1);
// // // //         } else {
// // // //           submitTier3Verification();
// // // //         }
// // // //       }, 1200);

// // // //       return () => clearTimeout(advanceTimer);
// // // //     }, DETECTION_DELAY_MS);

// // // //     return () => {
// // // //       clearInterval(tickInterval);
// // // //       clearTimeout(detectTimer);
// // // //     };
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [subStepIndex, cameraStatus]);

// // // //   return (
// // // //     <div>
// // // //       {/* Stepper */}
// // // //       <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
// // // //         {subSteps.map((s, i) => {
// // // //           const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
// // // //           const isCurrent = i === subStepIndex && phase === "checking";
// // // //           return (
// // // //             <div key={s.key} className="flex items-center gap-2 sm:gap-4">
// // // //               <div className="flex flex-col items-center gap-1">
// // // //                 <span
// // // //                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// // // //                     isDone
// // // //                       ? "bg-[#F59E0B] text-white"
// // // //                       : isCurrent
// // // //                       ? "bg-[#F59E0B] text-white"
// // // //                       : "bg-gray-100 text-gray-400"
// // // //                   }`}
// // // //                 >
// // // //                   {isDone ? <CheckCircle size={16} /> : i + 1}
// // // //                 </span>
// // // //                 <span
// // // //                   className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
// // // //                     isDone || isCurrent ? "text-amber-600" : "text-gray-400"
// // // //                   }`}
// // // //                 >
// // // //                   {s.label}
// // // //                 </span>
// // // //               </div>
// // // //               {i < subSteps.length - 1 && (
// // // //                 <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
// // // //               )}
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>

// // // //       {/* Camera frame */}
// // // //       <div
// // // //         className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-video border-2 transition-colors ${
// // // //           phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
// // // //         }`}
// // // //       >
// // // //         <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
// // // //           {phase === "detected" ? (
// // // //             <CheckCircle size={12} className="text-[#22C55E]" />
// // // //           ) : (
// // // //             <AlertCircle size={12} className="text-amber-400" />
// // // //           )}
// // // //           Liveness
// // // //         </span>

// // // //         {cameraStatus === "ready" && (
// // // //           <video
// // // //             ref={videoRef}
// // // //             autoPlay
// // // //             playsInline
// // // //             muted
// // // //             className="w-full h-full object-cover scale-x-[-1]"
// // // //           />
// // // //         )}

// // // //         {cameraStatus === "loading" && (
// // // //           <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
// // // //             Starting camera...
// // // //           </div>
// // // //         )}

// // // //         {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
// // // //           <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
// // // //             <AlertCircle size={22} className="text-amber-400" />
// // // //             <p className="text-sm text-white font-medium">
// // // //               {cameraStatus === "denied"
// // // //                 ? "Camera access was denied"
// // // //                 : "Camera not supported on this device"}
// // // //             </p>
// // // //             <p className="text-xs text-white/60">
// // // //               Please allow camera access in your browser settings and refresh to continue.
// // // //             </p>
// // // //           </div>
// // // //         )}

// // // //         {/* Face guide oval */}
// // // //         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// // // //           <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
// // // //         </div>

// // // //         {/* Progress bar along the bottom */}
// // // //         {cameraStatus === "ready" && (
// // // //           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
// // // //             <div
// // // //               className={`h-full transition-all duration-100 ${
// // // //                 phase === "detected" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
// // // //               }`}
// // // //               style={{ width: `${progress}%` }}
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Demonstration card */}
// // // //       <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
// // // //         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
// // // //           Demonstration
// // // //         </p>
// // // //         <span className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
// // // //           <UserRound size={26} className="text-gray-400" />
// // // //         </span>
// // // //         <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

// // // //         {phase === "detected" ? (
// // // //           <>
// // // //             <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
// // // //               <CheckCircle size={15} /> {current.detectedLabel}
// // // //             </span>
// // // //             <p className="text-xs text-gray-400">Continuing...</p>
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
// // // //             <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LivenessCheckStep;




// // // import { useEffect, useState } from "react";
// // // import { CheckCircle, AlertCircle, UserRound } from "lucide-react";
// // // import { useUser } from "../../context/UserContext";
// // // import { useCamera } from "../../hooks/useCamera";

// // // type SubStep = "positionFace" | "blink" | "turnHead";

// // // interface StepMeta {
// // //   key: SubStep;
// // //   label: string;
// // //   title: string;
// // //   subtitle: string;
// // //   detectedLabel: string;
// // // }

// // // const subSteps: StepMeta[] = [
// // //   {
// // //     key: "positionFace",
// // //     label: "Position Face",
// // //     title: "Position your face",
// // //     subtitle: "Center your face inside the frame and look straight ahead.",
// // //     detectedLabel: "Face detected",
// // //   },
// // //   {
// // //     key: "blink",
// // //     label: "Blink",
// // //     title: "Please blink naturally",
// // //     subtitle: "Keep looking at the camera and blink your eyes once.",
// // //     detectedLabel: "Blink detected",
// // //   },
// // //   {
// // //     key: "turnHead",
// // //     label: "Turn Head",
// // //     title: "Turn your head left, then right",
// // //     subtitle: "Slowly turn your head to the left, then back to the right.",
// // //     detectedLabel: "Head turn detected",
// // //   },
// // // ];

// // // // TODO (backend): Replace this simulated timer with a real liveness SDK call
// // // // (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// // // // the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// // // // here instead of the interval-based countdown below.
// // // const DETECTION_DELAY_MS = 5000;
// // // const TICK_MS = 100;

// // // const LivenessCheckStep = () => {
// // //   const { markTier3StepComplete, submitTier3Verification } = useUser();
// // //   const { videoRef, status: cameraStatus } = useCamera();

// // //   const [subStepIndex, setSubStepIndex] = useState(0);
// // //   const [phase, setPhase] = useState<"checking" | "detected">("checking");
// // //   const [progress, setProgress] = useState(0);

// // //   const current = subSteps[subStepIndex];

// // //   useEffect(() => {
// // //     if (cameraStatus !== "ready") return;
// // //     setPhase("checking");
// // //     setProgress(0);

// // //     const startedAt = Date.now();
// // //     const tickInterval = setInterval(() => {
// // //       const elapsed = Date.now() - startedAt;
// // //       setProgress(Math.min(100, Math.round((elapsed / DETECTION_DELAY_MS) * 100)));
// // //     }, TICK_MS);

// // //     const detectTimer = setTimeout(() => {
// // //       clearInterval(tickInterval);
// // //       setProgress(100);
// // //       setPhase("detected");
// // //       markTier3StepComplete(current.key);

// // //       const advanceTimer = setTimeout(() => {
// // //         if (subStepIndex < subSteps.length - 1) {
// // //           setSubStepIndex((i) => i + 1);
// // //         } else {
// // //           submitTier3Verification();
// // //         }
// // //       }, 1200);

// // //       return () => clearTimeout(advanceTimer);
// // //     }, DETECTION_DELAY_MS);

// // //     return () => {
// // //       clearInterval(tickInterval);
// // //       clearTimeout(detectTimer);
// // //     };
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [subStepIndex, cameraStatus]);

// // //   return (
// // //     <div>
// // //       {/* Stepper */}
// // //       <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
// // //         {subSteps.map((s, i) => {
// // //           const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
// // //           const isCurrent = i === subStepIndex && phase === "checking";
// // //           return (
// // //             <div key={s.key} className="flex items-center gap-2 sm:gap-4">
// // //               <div className="flex flex-col items-center gap-1">
// // //                 <span
// // //                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// // //                     isDone
// // //                       ? "bg-[#F59E0B] text-white"
// // //                       : isCurrent
// // //                       ? "bg-[#F59E0B] text-white"
// // //                       : "bg-gray-100 text-gray-400"
// // //                   }`}
// // //                 >
// // //                   {isDone ? <CheckCircle size={16} /> : i + 1}
// // //                 </span>
// // //                 <span
// // //                   className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
// // //                     isDone || isCurrent ? "text-amber-600" : "text-gray-400"
// // //                   }`}
// // //                 >
// // //                   {s.label}
// // //                 </span>
// // //               </div>
// // //               {i < subSteps.length - 1 && (
// // //                 <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
// // //               )}
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Camera frame */}
// // //       <div
// // //         className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-video border-2 transition-colors ${
// // //           phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
// // //         }`}
// // //       >
// // //         <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
// // //           {phase === "detected" ? (
// // //             <CheckCircle size={12} className="text-[#22C55E]" />
// // //           ) : (
// // //             <AlertCircle size={12} className="text-amber-400" />
// // //           )}
// // //           Liveness
// // //         </span>

// // //         {/* Video is ALWAYS mounted so the ref exists before the stream is ready */}
// // //         <video
// // //           ref={videoRef}
// // //           autoPlay
// // //           playsInline
// // //           muted
// // //           className={`w-full h-full object-cover scale-x-[-1] ${
// // //             cameraStatus === "ready" ? "block" : "hidden"
// // //           }`}
// // //         />

// // //         {cameraStatus === "loading" && (
// // //           <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
// // //             Starting camera...
// // //           </div>
// // //         )}

// // //         {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
// // //           <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
// // //             <AlertCircle size={22} className="text-amber-400" />
// // //             <p className="text-sm text-white font-medium">
// // //               {cameraStatus === "denied"
// // //                 ? "Camera access was denied"
// // //                 : "Camera not supported on this device"}
// // //             </p>
// // //             <p className="text-xs text-white/60">
// // //               Please allow camera access in your browser settings and refresh to continue.
// // //             </p>
// // //           </div>
// // //         )}

// // //         {/* Face guide oval */}
// // //         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// // //           <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
// // //         </div>

// // //         {/* Progress bar along the bottom */}
// // //         {cameraStatus === "ready" && (
// // //           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
// // //             <div
// // //               className={`h-full transition-all duration-100 ${
// // //                 phase === "detected" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
// // //               }`}
// // //               style={{ width: `${progress}%` }}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Demonstration card */}
// // //       <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
// // //         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
// // //           Demonstration
// // //         </p>
// // //         <span className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
// // //           <UserRound size={26} className="text-gray-400" />
// // //         </span>
// // //         <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

// // //         {phase === "detected" ? (
// // //           <>
// // //             <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
// // //               <CheckCircle size={15} /> {current.detectedLabel}
// // //             </span>
// // //             <p className="text-xs text-gray-400">Continuing...</p>
// // //           </>
// // //         ) : (
// // //           <>
// // //             <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
// // //             <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LivenessCheckStep;




// // import { useEffect, useState } from "react";
// // import { CheckCircle, AlertCircle, UserRound } from "lucide-react";
// // import { useUser } from "../../context/UserContext";
// // import { useCamera } from "../../hooks/useCamera";

// // type SubStep = "positionFace" | "blink" | "turnHead";

// // interface StepMeta {
// //   key: SubStep;
// //   label: string;
// //   title: string;
// //   subtitle: string;
// //   detectedLabel: string;
// // }

// // const subSteps: StepMeta[] = [
// //   {
// //     key: "positionFace",
// //     label: "Position Face",
// //     title: "Position your face",
// //     subtitle: "Center your face inside the frame and look straight ahead.",
// //     detectedLabel: "Face detected",
// //   },
// //   {
// //     key: "blink",
// //     label: "Blink",
// //     title: "Please blink naturally",
// //     subtitle: "Keep looking at the camera and blink your eyes once.",
// //     detectedLabel: "Blink detected",
// //   },
// //   {
// //     key: "turnHead",
// //     label: "Turn Head",
// //     title: "Turn your head left, then right",
// //     subtitle: "Slowly turn your head to the left, then back to the right.",
// //     detectedLabel: "Head turn detected",
// //   },
// // ];

// // // TODO (backend): Replace this simulated timer with a real liveness SDK call
// // // (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// // // the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// // // here instead of the interval-based countdown below.
// // const DETECTION_DELAY_MS = 5000;
// // const TICK_MS = 100;

// // const LivenessCheckStep = () => {
// //   const { markTier3StepComplete, submitTier3Verification } = useUser();
// //   const { videoRef, status: cameraStatus } = useCamera();

// //   const [subStepIndex, setSubStepIndex] = useState(0);
// //   const [phase, setPhase] = useState<"checking" | "detected">("checking");
// //   const [progress, setProgress] = useState(0);

// //   const current = subSteps[subStepIndex];

// //   useEffect(() => {
// //     if (cameraStatus !== "ready") return;
// //     setPhase("checking");
// //     setProgress(0);

// //     const startedAt = Date.now();
// //     const tickInterval = setInterval(() => {
// //       const elapsed = Date.now() - startedAt;
// //       setProgress(Math.min(100, Math.round((elapsed / DETECTION_DELAY_MS) * 100)));
// //     }, TICK_MS);

// //     const detectTimer = setTimeout(() => {
// //       clearInterval(tickInterval);
// //       setProgress(100);
// //       setPhase("detected");
// //       markTier3StepComplete(current.key);

// //       const advanceTimer = setTimeout(() => {
// //         if (subStepIndex < subSteps.length - 1) {
// //           setSubStepIndex((i) => i + 1);
// //         } else {
// //           submitTier3Verification();
// //         }
// //       }, 1200);

// //       return () => clearTimeout(advanceTimer);
// //     }, DETECTION_DELAY_MS);

// //     return () => {
// //       clearInterval(tickInterval);
// //       clearTimeout(detectTimer);
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [subStepIndex, cameraStatus]);

// //   return (
// //     <div>
// //       {/* Stepper */}
// //       <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
// //         {subSteps.map((s, i) => {
// //           const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
// //           const isCurrent = i === subStepIndex && phase === "checking";
// //           return (
// //             <div key={s.key} className="flex items-center gap-2 sm:gap-4">
// //               <div className="flex flex-col items-center gap-1">
// //                 <span
// //                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// //                     isDone
// //                       ? "bg-[#F59E0B] text-white"
// //                       : isCurrent
// //                       ? "bg-[#F59E0B] text-white"
// //                       : "bg-gray-100 text-gray-400"
// //                   }`}
// //                 >
// //                   {isDone ? <CheckCircle size={16} /> : i + 1}
// //                 </span>
// //                 <span
// //                   className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
// //                     isDone || isCurrent ? "text-amber-600" : "text-gray-400"
// //                   }`}
// //                 >
// //                   {s.label}
// //                 </span>
// //               </div>
// //               {i < subSteps.length - 1 && (
// //                 <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Camera frame */}
// //       <div
// //         className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-[3/4] max-w-sm mx-auto border-2 transition-colors ${
// //           phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
// //         }`}
// //       >
// //         <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
// //           {phase === "detected" ? (
// //             <CheckCircle size={12} className="text-[#22C55E]" />
// //           ) : (
// //             <AlertCircle size={12} className="text-amber-400" />
// //           )}
// //           Liveness
// //         </span>

// //         {/* Video is ALWAYS mounted so the ref exists before the stream is ready */}
// //         <video
// //           ref={videoRef}
// //           autoPlay
// //           playsInline
// //           muted
// //           className={`w-full h-full object-cover scale-x-[-1] scale-125 ${
// //             cameraStatus === "ready" ? "block" : "hidden"
// //           }`}
// //         />

// //         {cameraStatus === "loading" && (
// //           <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
// //             Starting camera...
// //           </div>
// //         )}

// //         {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
// //           <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
// //             <AlertCircle size={22} className="text-amber-400" />
// //             <p className="text-sm text-white font-medium">
// //               {cameraStatus === "denied"
// //                 ? "Camera access was denied"
// //                 : "Camera not supported on this device"}
// //             </p>
// //             <p className="text-xs text-white/60">
// //               Please allow camera access in your browser settings and refresh to continue.
// //             </p>
// //           </div>
// //         )}

// //         {/* Face guide oval */}
// //         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //           <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
// //         </div>

// //         {/* Progress bar along the bottom */}
// //         {cameraStatus === "ready" && (
// //           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
// //             <div
// //               className={`h-full transition-all duration-100 ${
// //                 phase === "detected" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
// //               }`}
// //               style={{ width: `${progress}%` }}
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Demonstration card */}
// //       <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
// //         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
// //           Demonstration
// //         </p>
// //         <span className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
// //           <UserRound size={26} className="text-gray-400" />
// //         </span>
// //         <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

// //         {phase === "detected" ? (
// //           <>
// //             <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
// //               <CheckCircle size={15} /> {current.detectedLabel}
// //             </span>
// //             <p className="text-xs text-gray-400">Continuing...</p>
// //           </>
// //         ) : (
// //           <>
// //             <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
// //             <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LivenessCheckStep;





// import { useEffect, useState } from "react";
// import { CheckCircle, AlertCircle, UserRound } from "lucide-react";
// import { useUser } from "../../context/UserContext";
// import { useCamera } from "../../hooks/useCamera";

// type SubStep = "positionFace" | "blink" | "turnHead";

// interface StepMeta {
//   key: SubStep;
//   label: string;
//   title: string;
//   subtitle: string;
//   detectedLabel: string;
// }

// const subSteps: StepMeta[] = [
//   {
//     key: "positionFace",
//     label: "Position Face",
//     title: "Position your face",
//     subtitle: "Center your face inside the frame and look straight ahead.",
//     detectedLabel: "Face detected",
//   },
//   {
//     key: "blink",
//     label: "Blink",
//     title: "Please blink naturally",
//     subtitle: "Keep looking at the camera and blink your eyes once.",
//     detectedLabel: "Blink detected",
//   },
//   {
//     key: "turnHead",
//     label: "Turn Head",
//     title: "Turn your head left, then right",
//     subtitle: "Slowly turn your head to the left, then back to the right.",
//     detectedLabel: "Head turn detected",
//   },
// ];

// // TODO (backend): Replace this simulated timer with a real liveness SDK call
// // (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// // the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// // here instead of the interval-based countdown below. A real SDK will also
// // handle cropping/isolating the face region — no frontend change needed for that.
// const DETECTION_DELAY_MS = 5000;
// const TICK_MS = 100;

// const LivenessCheckStep = () => {
//   const { markTier3StepComplete, submitTier3Verification } = useUser();
//   const { videoRef, status: cameraStatus } = useCamera();

//   const [subStepIndex, setSubStepIndex] = useState(0);
//   const [phase, setPhase] = useState<"checking" | "detected">("checking");
//   const [progress, setProgress] = useState(0);

//   const current = subSteps[subStepIndex];

//   useEffect(() => {
//     if (cameraStatus !== "ready") return;
//     setPhase("checking");
//     setProgress(0);

//     const startedAt = Date.now();
//     const tickInterval = setInterval(() => {
//       const elapsed = Date.now() - startedAt;
//       setProgress(Math.min(100, Math.round((elapsed / DETECTION_DELAY_MS) * 100)));
//     }, TICK_MS);

//     const detectTimer = setTimeout(() => {
//       clearInterval(tickInterval);
//       setProgress(100);
//       setPhase("detected");
//       markTier3StepComplete(current.key);

//       const advanceTimer = setTimeout(() => {
//         if (subStepIndex < subSteps.length - 1) {
//           setSubStepIndex((i) => i + 1);
//         } else {
//           submitTier3Verification();
//         }
//       }, 1200);

//       return () => clearTimeout(advanceTimer);
//     }, DETECTION_DELAY_MS);

//     return () => {
//       clearInterval(tickInterval);
//       clearTimeout(detectTimer);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [subStepIndex, cameraStatus]);

//   return (
//     <div>
//       {/* Stepper */}
//       <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
//         {subSteps.map((s, i) => {
//           const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
//           const isCurrent = i === subStepIndex && phase === "checking";
//           return (
//             <div key={s.key} className="flex items-center gap-2 sm:gap-4">
//               <div className="flex flex-col items-center gap-1">
//                 <span
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
//                     isDone
//                       ? "bg-[#F59E0B] text-white"
//                       : isCurrent
//                       ? "bg-[#F59E0B] text-white"
//                       : "bg-gray-100 text-gray-400"
//                   }`}
//                 >
//                   {isDone ? <CheckCircle size={16} /> : i + 1}
//                 </span>
//                 <span
//                   className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
//                     isDone || isCurrent ? "text-amber-600" : "text-gray-400"
//                   }`}
//                 >
//                   {s.label}
//                 </span>
//               </div>
//               {i < subSteps.length - 1 && (
//                 <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Camera frame */}
//       <div
//         className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-video border-2 transition-colors ${
//           phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
//         }`}
//       >
//         <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
//           {phase === "detected" ? (
//             <CheckCircle size={12} className="text-[#22C55E]" />
//           ) : (
//             <AlertCircle size={12} className="text-amber-400" />
//           )}
//           Liveness
//         </span>

//         {/* Video is ALWAYS mounted so the ref exists before the stream is ready */}
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           className={`w-full h-full object-cover scale-x-[-1] ${
//             cameraStatus === "ready" ? "block" : "hidden"
//           }`}
//         />

//         {cameraStatus === "loading" && (
//           <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
//             Starting camera...
//           </div>
//         )}

//         {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
//             <AlertCircle size={22} className="text-amber-400" />
//             <p className="text-sm text-white font-medium">
//               {cameraStatus === "denied"
//                 ? "Camera access was denied"
//                 : "Camera not supported on this device"}
//             </p>
//             <p className="text-xs text-white/60">
//               Please allow camera access in your browser settings and refresh to continue.
//             </p>
//           </div>
//         )}

//         {/* Face guide oval */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
//         </div>

//         {/* Progress bar along the bottom */}
//         {cameraStatus === "ready" && (
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
//             <div
//               className={`h-full transition-all duration-100 ${
//                 phase === "detected" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
//               }`}
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Demonstration card */}
//       <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
//         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
//           Demonstration
//         </p>
//         <span className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
//           <UserRound size={26} className="text-gray-400" />
//         </span>
//         <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

//         {phase === "detected" ? (
//           <>
//             <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
//               <CheckCircle size={15} /> {current.detectedLabel}
//             </span>
//             <p className="text-xs text-gray-400">Continuing...</p>
//           </>
//         ) : (
//           <>
//             <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
//             <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LivenessCheckStep;




import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useCamera } from "../../hooks/useCamera";
import StraightAvatar from "../../assets/StraightAvatar.png";
import BendAvatar from "../../assets/BendAvatar.png";

type SubStep = "positionFace" | "blink" | "turnHead";

interface StepMeta {
  key: SubStep;
  label: string;
  title: string;
  subtitle: string;
  detectedLabel: string;
  avatar: string;
}

const subSteps: StepMeta[] = [
  {
    key: "positionFace",
    label: "Position Face",
    title: "Position your face",
    subtitle: "Center your face inside the frame and look straight ahead.",
    detectedLabel: "Face detected",
    avatar: StraightAvatar,
  },
  {
    key: "blink",
    label: "Blink",
    title: "Please blink naturally",
    subtitle: "Keep looking at the camera and blink your eyes once.",
    detectedLabel: "Blink detected",
    avatar: StraightAvatar,
  },
  {
    key: "turnHead",
    label: "Turn Head",
    title: "Turn your head left, then right",
    subtitle: "Slowly turn your head to the left, then back to the right.",
    detectedLabel: "Head turn detected",
    avatar: BendAvatar,
  },
];

// TODO (backend): Replace this simulated timer with a real liveness SDK call
// (e.g. Smile Identity, AWS Rekognition, Youverify). Send captured frames from
// the video feed to POST /api/kyc/liveness-check and use the vendor's verdict
// here instead of the interval-based countdown below. A real SDK will also
// handle cropping/isolating the face region — no frontend change needed for that.
const DETECTION_DELAY_MS = 5000;
const TICK_MS = 100;

const LivenessCheckStep = () => {
  const { markTier3StepComplete, submitTier3Verification } = useUser();
  const { videoRef, status: cameraStatus } = useCamera();

  const [subStepIndex, setSubStepIndex] = useState(0);
  const [phase, setPhase] = useState<"checking" | "detected">("checking");
  const [progress, setProgress] = useState(0);

  const current = subSteps[subStepIndex];

  useEffect(() => {
    if (cameraStatus !== "ready") return;
    setPhase("checking");
    setProgress(0);

    const startedAt = Date.now();
    const tickInterval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / DETECTION_DELAY_MS) * 100)));
    }, TICK_MS);

    const detectTimer = setTimeout(() => {
      clearInterval(tickInterval);
      setProgress(100);
      setPhase("detected");
      markTier3StepComplete(current.key);

      const advanceTimer = setTimeout(() => {
        if (subStepIndex < subSteps.length - 1) {
          setSubStepIndex((i) => i + 1);
        } else {
          submitTier3Verification();
        }
      }, 1200);

      return () => clearTimeout(advanceTimer);
    }, DETECTION_DELAY_MS);

    return () => {
      clearInterval(tickInterval);
      clearTimeout(detectTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subStepIndex, cameraStatus]);

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
        {subSteps.map((s, i) => {
          const isDone = i < subStepIndex || (i === subStepIndex && phase === "detected");
          const isCurrent = i === subStepIndex && phase === "checking";
          return (
            <div key={s.key} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isDone
                      ? "bg-[#F59E0B] text-white"
                      : isCurrent
                      ? "bg-[#F59E0B] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? <CheckCircle size={16} /> : i + 1}
                </span>
                <span
                  className={`text-[11px] font-medium truncate max-w-[60px] text-center ${
                    isDone || isCurrent ? "text-amber-600" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < subSteps.length - 1 && (
                <div className="w-8 sm:w-16 h-0.5 bg-gray-200 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Camera frame */}
      <div
        className={`relative rounded-xl overflow-hidden bg-[#0B1220] aspect-video border-2 transition-colors ${
          phase === "detected" ? "border-[#22C55E]" : "border-[#F59E0B]"
        }`}
      >
        <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
          {phase === "detected" ? (
            <CheckCircle size={12} className="text-[#22C55E]" />
          ) : (
            <AlertCircle size={12} className="text-amber-400" />
          )}
          Liveness
        </span>

        {/* Video is ALWAYS mounted so the ref exists before the stream is ready */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover scale-x-[-1] ${
            cameraStatus === "ready" ? "block" : "hidden"
          }`}
        />

        {cameraStatus === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
            Starting camera...
          </div>
        )}

        {(cameraStatus === "denied" || cameraStatus === "unsupported") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            <AlertCircle size={22} className="text-amber-400" />
            <p className="text-sm text-white font-medium">
              {cameraStatus === "denied"
                ? "Camera access was denied"
                : "Camera not supported on this device"}
            </p>
            <p className="text-xs text-white/60">
              Please allow camera access in your browser settings and refresh to continue.
            </p>
          </div>
        )}

        {/* Face guide oval */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 sm:w-56 h-52 sm:h-72 border-2 border-white/50 rounded-[50%]" />
        </div>

        {/* Progress bar along the bottom */}
        {cameraStatus === "ready" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              className={`h-full transition-all duration-100 ${
                phase === "detected" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Demonstration card */}
      <div className="border border-gray-100 rounded-xl p-5 mt-5 flex flex-col items-center text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
          Demonstration
        </p>
        <img
          src={current.avatar}
          alt="Demonstration"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <p className="text-xs text-gray-400 mb-4">Follow this motion</p>

        {phase === "detected" ? (
          <>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] mb-1">
              <CheckCircle size={15} /> {current.detectedLabel}
            </span>
            <p className="text-xs text-gray-400">Continuing...</p>
          </>
        ) : (
          <>
            <p className="text-base font-bold text-gray-900 mb-1">{current.title}</p>
            <p className="text-sm text-gray-500 max-w-sm">{current.subtitle}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LivenessCheckStep;