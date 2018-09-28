# Scripts

*****

These are scripts for converting GWAS data into JSON to be read into the VR environment.

**Starting data example:**

MarkerName      Allele1 Allele2 Freq.Allele1.HapMapCEU  b       SE      p       N
rs4747841       A       G       0.551   -0.0011 0.0029  0.70    253213
rs4749917       T       C       0.436   0.0011  0.0029  0.70    253213

**After running rsID_to_loc.py:**

MarkerName      Chromosome      Location        Allele1 Allele2 Freq.Allele1.HapMapCEU  p
rs737656        chr10   100012738       A       G       0.367   0.042
rs737657        chr10   100012889       A       G       0.358   0.041

**After running loc_to_gene.py:**

MarkerName      Chromosome      Location        Allele1 Allele2 Freq.Allele1.HapMapCEU  p
INTERGENIC      rs4747841       chr10   9960128 A       G       0.551   0.70
INTERGENIC      rs4749917       chr10   9960258 T       C       0.436   0.70
LOXL4   rs737656        chr10   100012738       A       G       0.367   0.042

**After running json_coordinate_setup.py:**

[
        {
                "id": "rs6549198",
                "gene": "FRMD4B",
                "coords": [844.75020451,0.391564150724,-387.844186343],
                "chr": "chr3",
                "location": 69362958,
                "frequency": 0.9217,
                "p": 0.4059157
        },
        {
                "id": "rs13066342",
                "gene": "FRMD4B",
                "coords": [1018.3992798,0.42732317726,-467.554560343],
                "chr": "chr3",
                "location": 69369295,
                "frequency": 1.134,
                "p": 0.3738323
        },

This final output is in JSON format and ready to be used as input data for the VR environmnent.
