
[![DOI](https://zenodo.org/badge/81114857.svg)](https://zenodo.org/badge/latestdoi/81114857)

This is a frozen copy of the Perseids Journey of the Hero Prototype Code.

The workflow used to produce the data and prototype are described in 

https://github.com/perseids-project/perseids\_docs/issues/329

https://github.com/perseids-project/perseids\_docs/issues/295

https://github.com/perseids-project/perseids\_docs/issues/212

# Components

1) GapVis, originally developed by the Nick Rabinowitz / Google Ancient Places Project and enhanced by Thibault Clerice and Bridget Almas for the Perseids Project, Tufts University.
   The original code is in https://github.com/enridaga/gapvis
   Perseids development took place in https://github.com/perseids-project/gapvis


2) Perseids Client Apps, developed by Bridget Almas and Thibault Clerice for the Perseids Project, Tufts University
   Perseids development took place at https://github.com/perseids-project/perseids-client-apps

3) Annotation data produced by students in Marie-Claire Beaulieu's Mythology classes at Tufts University in fall 2014 and 2015

4) Pleaides Gazetteer data from http://pleiades.stoa.org/

# Running with Docker and Docker Compose

* `bash -c "cd data/ && tar xfz data.tgz"`
* `docker-compose build`
* `docker-compose up`
* Visit `http://localhost:5001/joth.html#index`

## Google Maps API

A Google Maps API key is required to get the maps to work (unless you're hosting the HTML on a domain that's been grandfathered in).
To add an API key, first go [here](https://developers.google.com/maps/documentation/javascript/get-api-key) and get a key.
Then replace `<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false">` with
`<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY">` in `gapvis/joth.html` and `gapvis/myth.html`.

# Prerequisites

1) An Apache 2.2 Web Server running mod\_wsgi

# External Service Dependencies

1) A CTS 5 Endpoint serving Smiths' "Dictionary of Greek and Roman Geography" via urn:cts:pdlrefwk:viaf88890045.003.perseus-eng1. As of the time of publication, the source for that text
could be found in the https://github.com/PerseusDL/canonical-pdlrefwk repository.

# Deployment Instructions

Described via the Puppet manifests in the puppet directory of this repo.

