// SPDX-FileCopyrightText: 2022 Mikhail Zolotukhin <mail@gikari.com>
// SPDX-License-Identifier: MIT

#pragma once

#include <QRect>

#include <vector>

#include "engine/window.hpp"

namespace Bismuth
{
class Layout
{
public:
    /**
     * Apply layout for the @p windows on tiling @p area. Method changes the
     * geometry of the windows to match the particular layout.
     */
    virtual void apply(QRect area, std::vector<Window> &windows) = 0;
};
}
