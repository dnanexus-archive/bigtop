# Scripts

*****

To convert input data from TSV to JSON format for use in BigTop, we provide the following script: SNP_info_retriever.py

`USAGE: python SNP_info_retriever.py infile.tsv [-1 -2 -3]`

To skip Step 1, add -1 to the command.  To skip Step 2, add -2 to the command.  To skip Step 3, add -3 to the command.

This Python program takes a file with SNP IDs (rs######) and produces the location, retrieved from the UCSC Genome Browser using CruzDB.  For more info on CruzDB, see here: https://github.com/brentp/cruzdb

Input structure: This takes a tab-separated values list of rsIDs (SNP IDs), such as:
```
rsID		major	minor	X	Y	Z	p-value	NaN
rs1113396	T	C	0.058	-0.014	0.0063	0.026	230497
```
Note that the SNP ID should be the first column.  The column containing the p-value can be set below this line.
In this example shown above, the p-value is in column 7, so the label within the python script is 6 (Python arrays start at 0).

This script produces (up to) three outputs:

infile.located.txt
infile.gene_loc.txt
infile.gene_loc.coords.json

The located.txt file contains the SNPs with their chromosomal locations.
The gene_loc file contains the SNPs with both their chromosomal locations and their gene info.
The coords.json file contains the same info as the gene_loc file, but in structured JSON format ready to be used for BigTop.

*****

**##### NOTE: DETAILS BELOW ARE FOR DEPRECATED SCRIPTS #####**

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

```[
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
```

This final output is in JSON format and ready to be used as input data for the VR environmnent.
