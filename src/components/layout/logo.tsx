import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

/**
 * The official BCON lockup: mark, "BCON" and "TECHNOLOGIES" as set in the
 * supplied brand artwork, extracted to a transparent PNG by
 * `scripts/extract-logo.py`.
 *
 * The artwork is used as-is rather than rebuilt from the vector mark and live
 * type, because the bevelled lettering cannot be reproduced in a web font.
 */
const LOCKUP = '/logo-lockup.png'

/** Intrinsic size of the extracted PNG, used to reserve layout space. */
const LOCKUP_WIDTH = 374
const LOCKUP_HEIGHT = 122

export function Logo({
  className,
  to = '/',
  heightClass = 'h-9',
}: {
  className?: string
  to?: string
  /** Height of the lockup; width follows from the artwork's aspect ratio. */
  heightClass?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center transition-opacity hover:opacity-90',
        className,
      )}
      aria-label="BCON Technologies — home"
    >
      <img
        src={LOCKUP}
        alt=""
        width={LOCKUP_WIDTH}
        height={LOCKUP_HEIGHT}
        className={cn('w-auto', heightClass)}
        // The PNG already carries the artwork's own dimensions.
        decoding="async"
      />
    </Link>
  )
}
