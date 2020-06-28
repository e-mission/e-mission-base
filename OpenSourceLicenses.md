This file lists the module dependencies for the project and their licenses.

1. Most of this module code is **not** redistributed, either in source or binary
form. Instead, it is downloaded automatically using package managers and linked
from the code. The module download includes the license and appropriate credit.

1. So our primary check here is for modules which do not have a license, or
which are GPL licensed.

### Overlap with e-mission-phone
As documented in the README, this project puts a minimal UI over the e-mission-phone. The javascript code in this project is minimal, and so are the dependencies.

The main modification is to the list of plugins. The original project contains a set of plugins chosen by the phonegap developers. This project contains the e-mission-phone plugins and one additional plugin required for the QR code scan.

## Redistributed, modified javascript dependencies
None

| Module | License | Original code |
|--------|---------|---------------|

## Javascript dependencies installed via bower

| Module | License |
|--------|---------|
| `www/lib/ionic` | MIT (from [`bower.json`](https://github.com/ionic-team/ionic-bower/blob/v1.3.0/bower.json)) |
| `angularLocalStorage` | MIT |

## Additional javascript dependencies installed via npm `package.json`

| Module | License |
|--------|---------|
| es6-promise-plugin | MIT |

### Cordova plugins additional to the phone app, installed automatically

| Module | License |
|--------|---------|
| phonegap-plugin-barcodescanner | MIT |
