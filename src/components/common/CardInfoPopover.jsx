import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Info, X } from "lucide-react";

/**
 * Reusable contextual popover triggered by an accessible Info (ⓘ) icon.
 * Replaces disruptive card flip interactions with an explicit, predictable click-to-open overlay.
 *
 * @param {Object} props
 * @param {string} props.cardId - Unique stable identifier for the card
 * @param {string|null} props.activeId - Currently open popover ID
 * @param {function} props.onToggle - Handler to toggle popover state
 * @param {string} props.title - Title for accessibility and popover header
 * @param {string} [props.subtitle] - Optional subtitle (e.g. Code, status, or frequency)
 * @param {string} props.description - Main plain-English description
 * @param {string} [props.secondaryDescription] - Optional technical details/notes
 * @param {string} [props.badgeText] - Optional status badge (e.g. Tolerance band)
 * @param {string} [props.actionLink] - Optional link to full ledger
 * @param {string} [props.actionText] - Label for the action link
 * @param {React.ReactNode} [props.extraAction] - Optional custom action element
 */
export default function CardInfoPopover({
  cardId,
  activeId,
  onToggle,
  title,
  subtitle,
  description,
  secondaryDescription,
  badgeText,
  actionLink,
  actionText = "Open Series Ledger",
  extraAction,
}) {
  const isOpen = activeId === cardId;
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverId = `popover-${cardId}`;

  // Close on outside click (click or tap)
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onToggle(cardId);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen, cardId, onToggle]);

  // Close on Escape key and return focus to the trigger icon
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onToggle(cardId);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, cardId, onToggle]);

  const handleButtonClick = (e) => {
    // Prevent triggering any parent card click or navigation
    e.preventDefault();
    e.stopPropagation();
    onToggle(cardId);
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* 1. Accessible Info (ⓘ) Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleButtonClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={popoverId}
        aria-label={`View details for ${title}`}
        title={`View details for ${title}`}
        className={`w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center border transition-colors select-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isOpen
            ? "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 shadow-xs"
            : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border-transparent"
        }`}
      >
        <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
      </button>

      {/* 2. Contextual Anchored Popover Dialog */}
      {isOpen && (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={`Details for ${title}`}
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] bg-white dark:bg-[#000000] border border-slate-300 dark:border-slate-800 shadow-2xl p-4 text-left font-sans text-xs card-popover-enter"
        >
          {/* Popover Header */}
          <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-200 dark:border-slate-800">
            <div className="min-w-0">
              <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm tracking-tight leading-snug">
                {title}
              </h4>
              {subtitle && (
                <div className="mt-0.5 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold truncate">
                  {subtitle}
                </div>
              )}
            </div>

            {/* Explicit Close Button inside Popover */}
            <button
              type="button"
              onClick={() => {
                onToggle(cardId);
                triggerRef.current?.focus();
              }}
              aria-label="Close details"
              title="Close details"
              className="w-7 h-7 min-w-[28px] min-h-[28px] flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shrink-0 -mr-1 -mt-1"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Popover Description Body (Constrained with smooth scroll) */}
          <div className="py-2.5 space-y-2 max-h-56 overflow-y-auto pr-1">
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {description}
            </p>

            {secondaryDescription && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 leading-normal">
                {secondaryDescription}
              </p>
            )}
          </div>

          {/* Popover Footer & Actions */}
          {(badgeText || actionLink || extraAction) && (
            <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 font-mono text-xs">
              {badgeText ? (
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
                  {badgeText}
                </span>
              ) : extraAction ? (
                <div>{extraAction}</div>
              ) : (
                <span />
              )}

              {actionLink && (
                <Link
                  to={actionLink}
                  onClick={() => onToggle(cardId)}
                  className="font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-1 shrink-0 text-xs"
                >
                  <span>{actionText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
