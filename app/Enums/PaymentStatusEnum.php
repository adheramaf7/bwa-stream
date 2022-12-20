<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case pending = 'pending';
    case paid = 'paid';

    public function label(): string
    {
        return match ($this) {
            static::pending => 'Pending',
            static::paid => 'Paid',
        };
    }
}
