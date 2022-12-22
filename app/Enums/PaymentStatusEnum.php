<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case pending = 'pending';
    case paid = 'paid';
    case failed = 'failed';

    public function label(): string
    {
        return match ($this) {
            static::pending => 'Pending',
            static::paid => 'Paid',
            static::failed => 'Failed',
        };
    }
}
