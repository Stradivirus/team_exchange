package com.mbccurrency.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;

@Document(collection = "export_import_price_index")
public class ExportImportPriceIndex {

    @Id
    private String id;

    private Date date;

    private Double value;

    @Field("unit_name")
    private String unitName;

    @Field("indicator_name")
    private String indicatorName;

    private String type; // "export" or "import"

	public ExportImportPriceIndex() {
		super();
	}

	public ExportImportPriceIndex(String id, Date date, Double value, String unitName, String indicatorName,
			String type) {
		super();
		this.id = id;
		this.date = date;
		this.value = value;
		this.unitName = unitName;
		this.indicatorName = indicatorName;
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getIndicatorName() {
		return indicatorName;
	}

	public void setIndicatorName(String indicatorName) {
		this.indicatorName = indicatorName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ExportImportPriceIndex [id=" + id + ", date=" + date + ", value=" + value + ", unitName=" + unitName
				+ ", indicatorName=" + indicatorName + ", type=" + type + "]";
	}
    
    
}
